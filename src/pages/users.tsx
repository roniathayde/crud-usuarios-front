import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import { getUsers } from '@/api/get-users'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { UserDialogDetails } from '@/components/user-dialog-details'
import { UsersTableRow } from '@/components/users-row'
import { useUsers } from '@/contexts/users'

export function Users() {
  const { data: usersResult, isSuccess } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: Infinity,
  })

  const { users, setUsers } = useUsers()
  const isFirstLoad = useRef(true) // Usado para evitar o loop infinito

  useEffect(() => {
    if (isSuccess && usersResult && isFirstLoad.current) {
      setUsers({ users: usersResult.users })
      // isFirstLoad.current = false // Evitar futuras atualizações desnecessárias
    }
  }, [isSuccess, usersResult, setUsers])

  return (
    <Dialog>
      <DialogContent>
        <UserDialogDetails />
      </DialogContent>

      <main className="w-full min-h-screen bg-primary-foreground flex justify-center items-center">
        <div className="w-full max-w-[800px] flex flex-col justify-center items-start">
          <DialogTrigger asChild>
            <Button variant={'default'} className="mb-10">
              Adicionar novo usuário
            </Button>
          </DialogTrigger>
          <div className="flex flex-col w-full">
            <Table>
              <TableCaption>A lista de todos usuários.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Nome de usuário</TableHead>
                  <TableHead className="w-[200px]">Ocupação</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users &&
                  users.users.map((user) => (
                    <UsersTableRow key={user.id} user={user} />
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </Dialog>
  )
}
