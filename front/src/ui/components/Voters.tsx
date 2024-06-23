import React from 'react'
import type { User } from '../../models/User.js'
import { Vote } from './Vote.js'

interface IVotersProps {
  users: Omit<User, 'observer'>[]
  hidden: boolean
  hovered?: string
}

export function Voters({ users, hidden, hovered }: IVotersProps): JSX.Element {
  return (
    <table style={{ flex: 1 }}>
      <tbody>
        {users.map((user, key) => (
          <tr key={key.toString()}>
            <td style={{ width: '100%', fontSize: '1rem' }}>{user.name}</td>
            <td>{user.vote && <Vote user={user} hidden={hidden} hovered={hovered} />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
