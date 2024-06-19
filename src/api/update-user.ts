import { api } from '@/lib/axios'

export interface UpdateUsersBody {
  name: string
  email: string
  role: 'Desenvolvedor' | 'Arquiteto' | 'Engenheiro'
  description: string
}

export async function updateUser(id: string, data: UpdateUsersBody) {
  const response = await api.put(`/user/${id}`, data)

  return response.data
}
