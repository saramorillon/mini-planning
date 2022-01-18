import { Divider } from '@blueprintjs/core'
import React, { useState } from 'react'
import { User } from '../../../models/User'
import { Votes } from '../../../utils/getVotes'
import { Chart } from '../Chart/Chart'
import { Voters } from '../Voters/Voters'

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
      <Divider className="self-stretch mx3" />
      <Chart votes={votes} hidden={hidden} setHovered={setHoverd} />
    </div>
  )
}
