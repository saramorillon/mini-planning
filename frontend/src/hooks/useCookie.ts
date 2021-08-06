import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

type CookieDiff = Record<string, { oldValue?: string; newValue?: string }>

const nativeCookieDesc = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie')
Object.defineProperty(Document.prototype, '_cookie', nativeCookieDesc)
Object.defineProperty(Document.prototype, 'cookie', {
  enumerable: true,
  configurable: true,
  get() {
    return this._cookie
  },
  set(value) {
    const oldValues = parseCookies(this._cookie)
    const newValues = parseCookies(value)
    const diff = diffCookies(oldValues, newValues)
    if (Object.keys(diff).length) {
      this.dispatchEvent(
        new CustomEvent<CookieDiff>('cookiechange', { detail: diff })
      )
    }
    this._cookie = value
  },
})

function parseCookies(str: string): Record<string, string> {
  return str
    .split(';')
    .filter(Boolean)
    .map((curr) => curr.split('='))
    .reduce((acc, curr) => ({ ...acc, [decodeURIComponent(curr[0].trim())]: decodeURIComponent(curr[1].trim()) }), {})
}

function diffCookies(oldCookie: Record<string, string>, newCookie: Record<string, string>): CookieDiff {
  const diff: Record<string, { oldValue?: string; newValue?: string }> = {}
  const keys = new Set([...Object.keys(oldCookie), ...Object.keys(newCookie)])
  for (const key of keys) {
    if (newCookie[key] !== oldCookie[key]) {
      diff[key] = { oldValue: oldCookie[key], newValue: newCookie[key] }
    }
  }
  return diff
}

export function useCookie(name: string): string {
  const [value, setValue] = useState(Cookies.get(name))

  useEffect(() => {
    document.addEventListener('cookiechange', function (e: CustomEvent<CookieDiff>) {
      if (e.detail[name]) {
        setValue(e.detail[name].newValue)
      }
    })
  }, [])

  return value
}
