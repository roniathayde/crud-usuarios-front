import { api } from '@/lib/axios'

export interface CreateUsersQuery {
  name: string
  email: string
  role: string
  description: string
}

export async function createUser({
  name,
  email,
  role,
  description,
}: CreateUsersQuery) {
  const response = await api.post('/user', {
    name,
    email,
    role,
    description,
  })

  return response.data
}
