import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Session } from '../context/SessionProvider'

type RouterContext = {
  authentication: Session
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
})
