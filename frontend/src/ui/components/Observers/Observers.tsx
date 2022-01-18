import { Classes } from '@blueprintjs/core'
import c from 'classnames'
import React from 'react'
import { User } from '../../../models/User'

interface IObserversProps {
  users: User[]
}

export function Observers({ users }: IObserversProps) {
  if (!users.length) return null

  return (
    <p className={c(Classes.TEXT_MUTED, 'mt2')}>
      <b>Observers:</b> {users.map((user) => user.name).join(', ')}
    </p>
  )
}
