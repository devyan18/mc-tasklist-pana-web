import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import { Session } from '../context/SessionProvider'

type RouterContext = {
  authentication: Session
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    const { user } = context.authentication

    if (user === null) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: () => <Outlet />,
})
