import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'
import { CookieDiff, registerCookieEvent } from '../utils/cookie'

registerCookieEvent()

export function useCookie(name: string): string | undefined {
  const [value, setValue] = useState(Cookies.get(name))

  const onCookieChange = useCallback((e: CustomEvent<CookieDiff>) => {
    setValue(e.detail[name])
  }, [])

  useEffect(() => {
    document.addEventListener('cookiechange', onCookieChange)
    return () => {
      document.removeEventListener('cookiechange', onCookieChange)
    }
  }, [])

  return value
}
