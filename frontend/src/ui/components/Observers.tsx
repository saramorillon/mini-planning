import React from 'react'
import type { User } from '../../models/User.js'

interface IObserversProps {
  users: User[]
}

export function Observers({ users }: IObserversProps) {
  if (!users.length) return null

  return (
    <p className="mt2">
      <small>Observers: {users.map((user) => user.name).join(', ')}</small>
    </p>
  )
}
