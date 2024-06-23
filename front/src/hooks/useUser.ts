import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import type { User } from '../models/User.js'

export function useUser(): Omit<User, 'vote'> | undefined {
  const { search } = useLocation()
  const params = useMemo(() => new URLSearchParams(search), [search])
  const name = useMemo(() => params.get('name'), [params])
  const observer = useMemo(() => params.get('observer') === 'true', [params])
  if (name) {
    return { name, observer }
  }
}
