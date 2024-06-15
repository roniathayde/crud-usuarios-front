import { api } from '@/lib/axios'

// interface GetUsersQuery {
//   id: string | null
//   userName: string | null
//   userRole: string | null
// }

export interface GetUserResponse {
  id: string
  name: string
  role: string
  email: string
  description: string
}

export async function getOnlyOneUser(idUser: string) {
  const response = await api.get<GetUserResponse>(`/user/${idUser}`)

  return response.data
}
