export type CookieDiff = Record<string, string>

function decode(value: string) {
  return decodeURIComponent(value.trim())
}

function parseCookie(cookie: string) {
  if (!cookie) return {}
  const [name, value] = cookie.split('=')
  if (!name || !value) return {}
  return { [decode(name)]: decode(value) }
}

function parseCookies(cookies: string): Record<string, string> {
  return cookies.split(';').reduce((acc, curr) => ({ ...acc, ...parseCookie(curr) }), {})
}

function getDiff(oldStr: string, newStr: string): CookieDiff {
  const oldCookie = parseCookies(oldStr)
  const newCookie = parseCookies(newStr)
  const diff: Record<string, string> = {}
  const keys = new Set([...Object.keys(oldCookie), ...Object.keys(newCookie)])
  for (const key of keys) {
    if (newCookie[key] !== oldCookie[key]) diff[key] = newCookie[key]
  }
  return diff
}

export function registerCookieEvent(): void {
  const nativeCookieDesc = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie')
  Object.defineProperty(Document.prototype, '_cookie', nativeCookieDesc)
  Object.defineProperty(Document.prototype, 'cookie', {
    enumerable: true,
    configurable: true,
    get() {
      return this._cookie
    },
    set(value) {
      const detail = getDiff(this._cookie, value)
      if (Object.keys(detail).length) {
        const event = new CustomEvent<CookieDiff>('cookiechange', { detail })
        this.dispatchEvent(event)
      }
      this._cookie = value
    },
  })
}
