import { api } from '@/lib/axios'

export interface GetUserResponse {
  user: {
    id: string
    name: string
    role: 'Desenvolvedor' | 'Arquiteto' | 'Engenheiro'
    email: string
    description: string
  }
}

export async function getOnlyOneUser(idUser: string) {
  const response = await api.get<GetUserResponse>(`/user/${idUser}`)

  return response.data
}
