import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'
import { CookieDiff } from '@src/utils/cookie'

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
