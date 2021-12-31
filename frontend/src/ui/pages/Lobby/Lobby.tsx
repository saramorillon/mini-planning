import { Button, Callout, Checkbox, Divider, InputGroup } from '@blueprintjs/core'
import fakerator from 'fakerator'
import Cookies from 'js-cookie'
import React, { useCallback, useMemo, useState } from 'react'
import { useUserContext } from '../../../contexts/UserContext'
import { Room } from '../Room/Room'

export function Lobby(): JSX.Element {
  const user = useUserContext()

  const placeholder = useMemo(() => fakerator(navigator.language).names.firstName(), [])
  const [name, setName] = useState('')
  const [observer, setObserver] = useState(false)

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      Cookies.set('user', JSON.stringify({ name, observer }))
    },
    [name, observer]
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
          placeholder={placeholder}
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
