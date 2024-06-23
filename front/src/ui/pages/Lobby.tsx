import React, { type FormEvent, useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../../hooks/useUser.js'
import { Room } from './Room.js'

export function Lobby(): JSX.Element {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const user = useUser()

  const [name, setName] = useState('')
  const [observer, setObserver] = useState(false)

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      const search = new URLSearchParams()
      search.set('name', name)
      search.set('observer', observer.toString())
      navigate(`${pathname}?${search}`)
    },
    [navigate, pathname, name, observer],
  )

  if (user) return <Room user={user} />

  return (
    <>
      <main className="mx-auto max-width-3">
        <h1>What&apos;s your name?</h1>
        <hr />
        <form onSubmit={onSubmit} className="flex items-center">
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-auto"
          />
          <label className="mx2">
            <input type="checkbox" checked={observer} onChange={(e) => setObserver(e.currentTarget.checked)} /> Observer
          </label>
          <button data-variant="primary" type="submit">
            Enter room
          </button>
        </form>
      </main>
    </>
  )
}
