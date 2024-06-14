import React, { createContext, ReactNode, useContext, useState } from 'react'

// Interface para um usuário individual
export interface User {
  id: string
  name: string
  role: string
  email: string
  description: string
}

// Interface para o estado do contexto
export interface UsersState {
  users: User[]
}

// Interface para o contexto completo, incluindo a função de atualização
export interface UsersContextType {
  users: UsersState
  setUsers: React.Dispatch<React.SetStateAction<UsersState>>
}

// Estado inicial
const initialState: UsersState = { users: [] }

// Criação do contexto
export const UsersContext = createContext<UsersContextType | undefined>(
  undefined,
)

// Definição da função UsersProvider
export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UsersState>(initialState)

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  )
}

// Hook personalizado para acessar o contexto
export function useUsers() {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider')
  }
  return context
}
