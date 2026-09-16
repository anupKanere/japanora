import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AppProvider } from './AppContext'

export function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}
