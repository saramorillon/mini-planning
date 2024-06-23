import { useCopy } from '@saramorillon/hooks'
import React, { useMemo } from 'react'
import { FiClipboard } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

export function Header(): JSX.Element {
  const { pathname } = useLocation()
  const [authorized, , copy] = useCopy()
  const url = useMemo(() => `${window.location.protocol}//${window.location.host}${pathname}`, [pathname])

  return (
    <nav aria-label="Main">
      <Link to="/">
        <img src="/favicon.svg" height={16} aria-label="Icon" /> <strong>Mini Planning</strong>
      </Link>

      {authorized && pathname.startsWith('/room') && (
        <button type="button" className="ml-auto" onClick={() => copy(url)}>
          <small>
            <FiClipboard /> Copy invitation link
          </small>
        </button>
      )}
    </nav>
  )
}
