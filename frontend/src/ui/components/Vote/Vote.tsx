import { Tag } from '@blueprintjs/core'
import React from 'react'
import { User } from '../../../models/User'

interface IVoteProps {
  user: Omit<User, 'observer'>
  hidden: boolean
  hovered?: string
}

export function Vote({ user, hidden, hovered }: IVoteProps) {
  if (hidden) return <>✓</>
  return (
    <Tag intent={user.vote === hovered ? 'primary' : 'none'} round minimal={user.vote !== hovered}>
      {user.vote}
    </Tag>
  )
}
