import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Sidebar } from '../components/Sidebar'
import { Divider } from '../components/Divider'

export const Route = createFileRoute('/_private')({
  beforeLoad: async ({ context }) => {
    const { user } = context.authentication

    if (user === null) {
      throw redirect({
        to: '/login',
      })
    }

    if (user === undefined) {
      throw redirect({
        to: '/loading',
      })
    }
  },
  component: () => (
    <>
      <div className="flex min-w-full h-screen font-geist">
        <div className="w-full bg-gray-950 flex flex-row p-2 shadow-sm shadow-gray-900">
          <Sidebar />
          <Divider />
          <Outlet />
        </div>
      </div>
    </>
  ),
})
