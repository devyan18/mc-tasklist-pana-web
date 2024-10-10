import { createContext, useState, useEffect, useContext } from 'react'
import { SessionService } from '../services/session.service'
import { User } from '../types/user.entity'

export type Session = {
  user: User | null | undefined
  setUser: (user: User) => void
}

const SessionContext = createContext<Session>({
  user: undefined,
  setUser: () => {},
})

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [session, setSession] = useState<Session>({
    user: undefined,
    setUser: () => {},
  })

  const handleSetUser = (user: User | null | undefined) => {
    setSession((e) => {
      return { ...e, user }
    })
  }

  useEffect(() => {
    SessionService.getMe()
      .then(({ user }) => {
        console.log(user)
        handleSetUser(user)
      })
      .catch(() => {
        handleSetUser(null)
      })
  }, [])

  return (
    <SessionContext.Provider
      value={{ user: session.user, setUser: handleSetUser }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext)
