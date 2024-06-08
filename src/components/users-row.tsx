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
  console.log(' aqui : ', user)
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
        <Button variant={'destructive'}>Excluir</Button>
      </TableCell>
    </TableRow>
  )
}
