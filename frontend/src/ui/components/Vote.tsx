import React from 'react'
import type { User } from '../../models/User.js'

interface IVoteProps {
  user: Omit<User, 'observer'>
  hidden: boolean
  hovered?: string
}

export function Vote({ user, hidden, hovered }: IVoteProps) {
  if (hidden) return <div className="card small">✓</div>
  return <div className={`card small${hovered === user.vote ? ' hovered' : ''}`}>{user.vote}</div>
}
