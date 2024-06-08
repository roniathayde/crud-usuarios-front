import { deleteUser, DeleteUsersQuery } from '@/api/delete-user'
import { TableCell, TableRow } from '@/components/ui/table'

import { Button } from './ui/button'

interface UsersTableRowProps {
  user: {
    id: string
    name: string
    role: string
    email: string
    description: string
  }
}

export function UsersTableRow({ user }: UsersTableRowProps) {
  async function handleDeleteUser(id: DeleteUsersQuery) {
    try {
      await deleteUser(id)
    } catch (error) {
      console.log(error)
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
          variant={'destructive'}
          onClick={() => handleDeleteUser(user.id)}
        >
          Excluir
        </Button>
      </TableCell>
    </TableRow>
  )
}
