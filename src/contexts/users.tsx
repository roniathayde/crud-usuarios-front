import React, { createContext, ReactNode, useContext, useState } from 'react'

export interface User {
  id: string
  name: string
  role: string
  email: string
  description: string
}

export interface UsersState {
  users: User[]
}

export interface UsersContextType {
  users: UsersState
  setUsers: React.Dispatch<React.SetStateAction<UsersState>>
}

const initialState: UsersState = { users: [] }

export const UsersContext = createContext<UsersContextType | undefined>(
  undefined,
)

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UsersState>(initialState)

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error('useUsers só pode ser usado dentro ded UseProvider')
  }
  return context
}
