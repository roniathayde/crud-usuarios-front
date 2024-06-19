import { createBrowserRouter } from 'react-router-dom'

import { Header } from './components/header'
import { EditUser } from './pages/edit-user'
import { Users } from './pages/users'

export const router = createBrowserRouter([
  {
    element: <Header />,
    children: [
      {
        path: '/',
        element: <Users />,
      },
      {
        path: '/users/:id', // Rota dinâmica para edição do usuário
        element: <EditUser />,
      },
    ],
  },
])
