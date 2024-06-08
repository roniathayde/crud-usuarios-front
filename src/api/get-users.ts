import { api } from '@/lib/axios'

// interface GetUsersQuery {
//   id: string | null
//   userName: string | null
//   userRole: string | null
// }

export interface GetUsersResponse {
  users: {
    id: string
    name: string
    role: string
    email: string
    description: string
  }[]
}

export async function getUsers() {
  const response = await api.get<GetUsersResponse>('/users')

  return response.data
}
