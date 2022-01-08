import { HTMLTable } from '@blueprintjs/core'
import React from 'react'
import { User } from '../../../models/User'
import { SmallCard } from '../Card/Card'

interface IUsersProps {
  users: User[]
  hidden: boolean
  hovered?: string
}

export function Users({ users, hidden, hovered }: IUsersProps): JSX.Element {
  return (
    <HTMLTable striped className="flex-auto mr2">
      <tbody>
        {users.map((user, key) => (
          <tr key={key}>
            <td style={{ width: '100%' }}>{user.name}</td>
            <td>
              {(user.vote || user.observer) && (
                <SmallCard active intent={user.vote === hovered ? 'primary' : 'none'} $nohover>
                  {user.observer ? '👀' : hidden ? '✓' : user.vote}
                </SmallCard>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  )
}
