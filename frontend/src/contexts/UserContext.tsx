import React, { createContext, PropsWithChildren, useContext } from 'react'
import { useCookie } from '@src/hooks/useCookie'
import { User } from '@src/models/User'

const UserContext = createContext<Omit<User, 'vote'> | null>(null)

export function UserProvider({ children }: PropsWithChildren<unknown>): JSX.Element {
  const cookie = useCookie('user')
  return <UserContext.Provider value={cookie ? JSON.parse(cookie) : null}>{children}</UserContext.Provider>
}

export function useUserContext(): Omit<User, 'vote'> | null {
  return useContext(UserContext)
}
