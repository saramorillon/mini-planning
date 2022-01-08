import React, { useState } from 'react'
import { User } from '../../../models/User'
import { Votes } from '../../../utils/getVotes'
import { Chart } from '../Chart/Chart'
import { Users } from '../Users/Users'

interface IResultProps {
  users: User[]
  votes: Votes
  hidden: boolean
}

export function Result({ users, votes, hidden }: IResultProps): JSX.Element {
  const [hovered, setHoverd] = useState<string>()

  return (
    <div className="flex items-start">
      <Users users={users} hidden={hidden} hovered={hovered} />
      <Chart votes={votes} hidden={hidden} setHovered={setHoverd} />
    </div>
  )
}
