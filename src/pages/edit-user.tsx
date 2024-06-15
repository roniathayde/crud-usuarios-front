import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { error } from 'console'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { isError } from 'util'

import { getOnlyOneUser, GetUserResponse } from '@/api/get-only-one-user'
import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

export function EditUser() {
  const { id } = useParams<{ id: string }>() // Obtendo o ID da URL
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [user, setUser] = useState<GetUserResponse | null>(null)

  // Fetching user data using useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user', id], // Query key that includes the user ID
    queryFn: () => getOnlyOneUser(id!), // Fetching user data based on ID
    // enabled: !!id, // Ensures the query runs only if id is not null
    // staleTime: Infinity, // Cache indefinitely or adjust as needed
  })

  useEffect(() => {}, [data])

  // Mutation for updating user data
  // const mutation = useMutation(
  //   (updatedUser: GetUserResponse) => api.put(`/user/${id}`, updatedUser),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(['user', id])
  //       navigate('/') // Navigate to the users list after successful update
  //     },
  //     onError: (err: any) => {
  //       console.error('Failed to update user:', err.message)
  //     },
  //   },
  // )
  console.log('data; ', data)
  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault()
  //   if (user) {
  //     mutation.mutate(user)
  //   }
  // }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return data ? (
    <form>
      <label>
        Name:
        <input
          type="text"
          value={user?.name || ''}
          // onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </label>
      <label>
        Role:
        <input
          type="text"
          value={user?.role || ''}
          // onChange={(e) => setUser({ ...user, role: e.target.value })}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={user?.email || ''}
          // onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </label>
      <label>
        Description:
        <textarea
          value={user?.description || ''}
          // onChange={(e) => setUser({ ...user, description: e.target.value })}
        />
      </label>
      <button type="submit">
        {/* {mutation.isLoading ? 'Saving...' : 'Save'} */}
        SAVE
      </button>
      {/* {mutation.isError && <div>Error: {mutation.error?.message}</div>} */}
      error
    </form>
  ) : (
    <div>User not found</div>
  )
}
