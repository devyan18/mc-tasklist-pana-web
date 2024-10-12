import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Session } from '../context/SessionProvider'
import { Toaster } from 'react-hot-toast'

type RouterContext = {
  authentication: Session
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster
        position="bottom-right"
        gutter={8}
        containerStyle={{}}
        containerClassName=""
        toastOptions={{
          duration: 5000,
          style: {
            background: '#020617',
            color: '#fff',
            borderRadius: '8px',
            borderWidth: '2px',
            borderColor: '#111827',
          },
        }}
      />
    </>
  ),
})
