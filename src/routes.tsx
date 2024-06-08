import { createBrowserRouter } from 'react-router-dom'

import { Users } from './pages/users'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Users />,
    // errorElement: <Error />,
    // errorElement: <Error />,
  },
  // {
  //   path: '*',
  //   // element: <NotFound />,
  //   element: <div>Rota não encontrada</div>,
  // },
])
