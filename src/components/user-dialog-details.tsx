import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createUser } from '@/api/create-user'
import { GetUsersResponse } from '@/api/get-users'
import { queryClient } from '@/lib/react-query'

import { Button } from './ui/button'
import { DialogHeader } from './ui/dialog'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Textarea } from './ui/textarea'

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['Desenvolvedor', 'Arquiteto', 'Engenheiro']),
  description: z.string(),
})

type UserSchema = z.infer<typeof userSchema>

export function UserDialogDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  })

  const { mutateAsync: createUserFn, isPending: addNewUserBtnIsPending } =
    useMutation({
      mutationFn: createUser,
      onSuccess: (newUser) => {
        queryClient.setQueryData<GetUsersResponse>(['users'], (oldUsers) => {
          console.log('aqui', oldUsers)
          if (!oldUsers) return { users: [newUser] }
          return { users: [...oldUsers.users, newUser] }
        })

        reset()

        toast.success('Usuário adicionado com sucesso.')
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(`Falha ao criar usuário. ${error.response.data.message}`)
        } else {
          toast.error('Falha ao criar usuário. Erro desconhecido.')
        }
      },
    })

  async function handleUserCreate(data: UserSchema) {
    try {
      await createUserFn(data)

      toast.success('Usuário adicionado com sucesso.')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Falha ao criar usuário. ${error.response.data.message}`)
      } else {
        toast.error('Falha ao criar usuário. Erro desconhecido.')
      }
    }
  }

  return (
    <>
      <DialogHeader>#1</DialogHeader>
      <form
        onSubmit={handleSubmit(handleUserCreate)}
        className="flex flex-col gap-10"
      >
        {errors.role && <p>errorole</p>}
        {errors.root?.message && <p>{errors.root?.message}</p>}
        <div className=" flex flex-col gap-6">
          <div>
            <label htmlFor="name" className="sr-only">
              Nome de usuário
            </label>
            <Input
              className="bg-primary-foreground text-foreground font-semibold text-sm placeholder:text-muted-foreground"
              type="text"
              id="name"
              placeholder="Nome de usuário"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-destructive text-xs">Campo obrigatório</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              E-mail
            </label>
            <Input
              className="bg-primary-foreground text-foreground font-semibold text-sm placeholder:text-muted-foreground"
              type="text"
              id="email"
              placeholder="E-mail"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-destructive text-xs">
                Insira um e-mail válido
              </p>
            )}
          </div>
          <div>
            <Controller
              name="role"
              control={control}
              defaultValue="Desenvolvedor"
              render={() => (
                <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Desenvolvedor">Desenvolvedor</SelectItem>
                    <SelectItem value="Arquiteto">Arquiteto</SelectItem>
                    <SelectItem value="Engenheiro">Engenheiro</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-destructive text-xs">Campo obrigatório</p>
            )}
          </div>

          <div>
            <Textarea
              className="resize-none"
              placeholder="Descreva suas melhores habilidades"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-destructive text-xs">Campo obrigatório</p>
            )}
          </div>
        </div>
        <div className="flex gap-4 justify-end">
          <DialogClose asChild>
            <Button variant={'destructive'}>Cancelar</Button>
          </DialogClose>
          <Button
            disabled={addNewUserBtnIsPending}
            type="submit"
            variant={'default'}
          >
            Adicionar
          </Button>
        </div>
      </form>
    </>
  )
}
