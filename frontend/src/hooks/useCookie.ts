import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'
import { registerCookieEvent } from '../utils/cookie'

registerCookieEvent()

export function useCookie(name: string): string | undefined {
  const [value, setValue] = useState(Cookies.get(name))

  const onCookieChange = useCallback(
    (e: Event) => {
      setValue((e as CustomEvent).detail[name])
    },
    [name]
  )

  useEffect(() => {
    document.addEventListener('cookiechange', onCookieChange)
    return () => {
      document.removeEventListener('cookiechange', onCookieChange)
    }
  }, [onCookieChange])

  return value
}
