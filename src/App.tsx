import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { useSession } from './context/SessionProvider'

const router = createRouter({
  routeTree,
  context: {
    authentication: undefined!,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  const authentication = useSession()
  return <RouterProvider router={router} context={{ authentication }} />
}
