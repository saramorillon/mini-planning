import { HTMLTable, Tag } from '@blueprintjs/core'
import React from 'react'
import { User } from '../../../models/User'

interface IUsersProps {
  users: User[]
  hidden: boolean
  hovered?: string
}

export function Users({ users, hidden, hovered }: IUsersProps): JSX.Element {
  return (
    <HTMLTable striped style={{ flex: 1 }}>
      <tbody>
        {users.map((user, key) => (
          <tr key={key}>
            <td style={{ width: '100%', fontSize: '1rem' }}>{user.name}</td>
            <td>{(user.vote || user.observer) && <Vote user={user} hidden={hidden} hovered={hovered} />}</td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  )
}

interface IVoteProps {
  user: User
  hidden: boolean
  hovered?: string
}

function Vote({ user, hidden, hovered }: IVoteProps) {
  if (user.observer) return <>👀</>
  if (hidden) return <>✓</>
  return (
    <Tag intent={user.vote === hovered ? 'primary' : 'none'} round minimal={user.vote !== hovered}>
      {user.vote}
    </Tag>
  )
}
