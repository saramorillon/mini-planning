import React from 'react'
import { Chart } from '../Chart/Chart'
import { Users } from '../Users/Users'
import { User } from '@src/models/User'

interface IResultProps {
  users: User[]
  votes: Record<string, number>
  hidden: boolean
}

export function Result({ users, votes, hidden }: IResultProps): JSX.Element {
  return (
    <div className="d-flex mb-5">
      <div className="flex-grow-1 mr-4">
        <Users users={users} hidden={hidden} />
      </div>
      <Chart votes={votes} hidden={hidden} />
    </div>
  )
}
