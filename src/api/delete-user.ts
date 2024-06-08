import { api } from '@/lib/axios'

export interface DeleteUsersQuery {
  id: string
}

export async function deleteUser(id: DeleteUsersQuery) {
  const response = await api.delete(`/user/${id}`)

  return response.data
}
