import React, { useState } from 'react'
import type { User } from '../../models/User.js'
import type { Votes } from '../../utils/getVotes.js'
import { Chart } from './Chart.js'
import { Voters } from './Voters.js'

interface IResultProps {
  users: User[]
  votes: Votes
  hidden: boolean
}

export function Result({ users, votes, hidden }: IResultProps): JSX.Element {
  const [hovered, setHoverd] = useState<string>()

  return (
    <div className="flex items-start">
      <Voters users={users} hidden={hidden} hovered={hovered} />
      <hr className="self-stretch mx3" />
      <Chart votes={votes} hidden={hidden} setHovered={setHoverd} />
    </div>
  )
}
