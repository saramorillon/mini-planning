import { Button, Callout, Checkbox, Divider, InputGroup } from '@blueprintjs/core'
import React, { useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../../../hooks/useUser'
import { Room } from '../Room/Room'

export function Lobby(): JSX.Element {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const user = useUser()

  const [name, setName] = useState('')
  const [observer, setObserver] = useState(false)

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const search = new URLSearchParams()
      search.set('name', name)
      search.set('observer', observer.toString())
      navigate(`${pathname}?${search}`)
    },
    [navigate, pathname, name, observer]
  )

  if (user) return <Room user={user} />

  return (
    <Callout className="p4">
      <h1>What&apos;s your name?</h1>
      <Divider />
      <form onSubmit={onSubmit} className="flex items-center">
        <InputGroup
          large
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Checkbox
          label="Observer"
          className="mx2 my0"
          checked={observer}
          onChange={(e) => setObserver(e.currentTarget.checked)}
        />
        <Button intent="primary" large type="submit">
          Enter room
        </Button>
      </form>
    </Callout>
  )
}
