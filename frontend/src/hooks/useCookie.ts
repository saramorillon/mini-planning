import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'
import { CookieDiff, registerCookieEvent } from '@src/utils/cookie'

registerCookieEvent()

export function useCookie(name: string): string {
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
