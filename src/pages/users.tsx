import { useQuery } from '@tanstack/react-query'

import { getUsers } from '@/api/get-users'
import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
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

export function Users() {
  // const [searchParams] = useSearchParams()

  // const id = searchParams.get('id')
  // const userName = searchParams.get('userName')
  // const userRole = searchParams.get('role')

  const { data: usersResult } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  })

  console.log(usersResult)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Dialog>
        <DialogContent>
          <UserDialogDetails />
        </DialogContent>
        <Header />

        <main className="w-full min-h-screen bg-primary-foreground flex justify-center items-center">
          <div className="w-full max-w-[800px] flex flex-col justify-center items-start">
            <DialogTrigger asChild>
              <Button variant={'default'} className="mb-10">
                Adicionar novo usuário
              </Button>
            </DialogTrigger>
            <div className="flex flex-col w-full">
              <form action="" className="flex gap-2">
                <label htmlFor="searchByName" className="sr-only">
                  Buscar por nome
                </label>
                <Input
                  className="bg-primary-foreground text-foreground font-semibold text-sm placeholder:text-muted-foreground"
                  type="text"
                  id="searchByName"
                  placeholder="Buscar por nome..."
                />

                <label htmlFor="searchById" className="sr-only">
                  Buscar por ID
                </label>
                <Input
                  className="bg-primary-foreground text-foreground font-semibold text-sm placeholder:text-muted-foreground"
                  type="text"
                  id="searchById"
                  placeholder="Buscar por ID..."
                />

                <Button variant={'outline'}>Filtrar</Button>
              </form>

              <Table>
                <TableCaption>A lista de todos usuários.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Nome de usuário</TableHead>
                    <TableHead className="w-[200px]">Ocução</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* <UsersTableRow /> */}
                  {usersResult &&
                    usersResult.users.map((user) => {
                      return <UsersTableRow key={user.id} user={user} />
                    })}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </Dialog>
    </ThemeProvider>
  )
}
