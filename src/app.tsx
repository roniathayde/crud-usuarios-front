import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme-provider'
import { UsersProvider } from './contexts/users'
import { queryClient } from './lib/react-query'
import { router } from './routes'

export function App() {
  return (
    <UsersProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster richColors />
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </UsersProvider>
  )
}
