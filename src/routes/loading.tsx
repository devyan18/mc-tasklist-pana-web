import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useSession } from '../context/SessionProvider'
import { useEffect } from 'react'
import { Spinner } from '../components/spinner'

export const Route = createFileRoute('/loading')({
  component: () => <Loading />,
})

const Loading = () => {
  const { user } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (user === undefined) {
      return
    }

    if (user === null) {
      navigate({
        to: '/login',
      })
    }

    if (user) {
      navigate({
        to: '/tasks',
      })
    }
  }, [user, navigate])

  return (
    <div className="text-white flex min-h-screen items-center justify-center flex-col">
      <Spinner />
      <h2>Loading...</h2>
    </div>
  )
}
