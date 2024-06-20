import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { getOnlyOneUser } from '@/api/get-only-one-user'
import { updateUser, UpdateUsersBody } from '@/api/update-user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { queryClient } from '@/lib/react-query'

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['Desenvolvedor', 'Arquiteto', 'Engenheiro']),
  description: z.string(),
})

type UserSchema = z.infer<typeof userSchema>

export function EditUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  })

  const { id } = useParams<{ id: string }>()

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getOnlyOneUser(id!),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateUsersBody) => updateUser(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })

      toast.success('usuário atualizado com sucesso')
    },
    onError: (error) => {
      console.error('Erro ao atualizar o usuário:', error)
      toast.error('Erro ao atualizar o usuário')
    },
  })
  const onSubmit = (formData: UserSchema) => {
    mutate(formData)
  }

  useEffect(() => {
    if (isSuccess) {
      setValue('name', data.user.name)
      setValue('email', data.user.email)
      setValue('role', data.user.role)
      setValue('description', data.user.description)
    }
  }, [data, isSuccess, setValue])

  return (
    <>
      <div className="flex justify-center  ">
        <div className="p-8  w-full max-w-[800px]">
          {data && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-10"
            >
              <h1 className="text-2xl font-bold tracking-tight">
                Editar usuário {data.user.id}
              </h1>
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
                    <p className="text-destructive text-xs">
                      Campo obrigatório
                    </p>
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
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Escolha um cargo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Desenvolvedor">
                            Desenvolvedor
                          </SelectItem>
                          <SelectItem value="Arquiteto">Arquiteto</SelectItem>
                          <SelectItem value="Engenheiro">Engenheiro</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.role && (
                    <p className="text-destructive text-xs">
                      Campo obrigatório
                    </p>
                  )}
                </div>

                <div>
                  <Textarea
                    className="resize-none"
                    placeholder="Descreva suas melhores habilidades"
                    {...register('description')}
                  />
                  {errors.description && (
                    <p className="text-destructive text-xs">
                      Campo obrigatório
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-4 justify-end">
                <Button variant="outline" asChild>
                  <Link to="/">Voltar</Link>
                </Button>
                <Button disabled={isPending} type="submit" variant={'default'}>
                  Salvar
                </Button>
              </div>
            </form>
          )}
          {isLoading && (
            <div className="flex flex-col gap-10">
              <div className=" flex flex-col gap-6">
                <Skeleton className="w-full h-[40px] rounded-md" />
                <Skeleton className="w-full h-[40px] rounded-md" />
                <Skeleton className="w-full h-[40px] rounded-md" />
                <Skeleton className="w-full h-[80px] rounded-md" />
              </div>
              <div className="flex gap-4 justify-end">
                <Skeleton className="w-[72px] h-[40px] rounded-md" />
                <Skeleton className="w-[92px] h-[40px] rounded-md" />
              </div>
            </div>
          )}
          {isError && <p>houve um erro</p>}
        </div>
      </div>
    </>
  )
}
