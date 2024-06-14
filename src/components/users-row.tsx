import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteUser } from '@/api/delete-user'
import { GetUsersResponse } from '@/api/get-users'
import { queryClient } from '@/lib/react-query'

import { Button } from './ui/button'
import { TableCell, TableRow } from './ui/table'

export interface UserSchema {
  id: string
  name: string
  role: string
  email: string
  description: string
}

export interface UsersTableRowProps {
  user: UserSchema
}

export function UsersTableRow({ user }: UsersTableRowProps) {
  const { mutateAsync: deleteProfileFn, isPending: cancelIsPending } =
    useMutation({
      mutationFn: deleteUser,
      onSuccess: (_, userId) => {
        queryClient.setQueryData<GetUsersResponse>(['users'], (oldData) => {
          if (!oldData) return { users: [] } // Caso não haja dados, retorna uma lista vazia
          return {
            users: oldData.users.filter((user) => user.id !== userId),
          }
        })
      },
    })

  async function handleDeleteUser(user: UserSchema) {
    try {
      await deleteProfileFn(user.id)
      toast.success('Usuário deletado com sucesso.')
    } catch (error) {
      toast.error(
        'Falha ao deletar o usuário. Tente novamente ou recarregue a página.',
      )
    }
  }

  return (
    <TableRow>
      <TableCell className="font-medium max-w-[80px] overflow-ellipsis overflow-hidden text-nowrap">
        #{user.id}
      </TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        <Button variant={'ghost'}>Editar</Button>
      </TableCell>
      <TableCell>
        <Button variant={'outline'}>Ver</Button>
      </TableCell>
      <TableCell>
        <Button
          disabled={cancelIsPending}
          variant={'destructive'}
          onClick={() => handleDeleteUser(user)}
        >
          Excluir
        </Button>
      </TableCell>
    </TableRow>
  )
}
