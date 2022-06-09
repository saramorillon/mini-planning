import React from 'react'
import { User } from '../../models/User'

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
