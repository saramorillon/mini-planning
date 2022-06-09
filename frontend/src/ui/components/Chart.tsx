import React, { Dispatch, SetStateAction } from 'react'
import { Votes } from '../../utils/getVotes'
import { cards } from './Cards'
import { VoteBar } from './VoteBar'

interface IChartProps {
  votes: Votes
  hidden: boolean
  setHovered: Dispatch<SetStateAction<string | undefined>>
}

export function Chart({ votes, hidden, setHovered }: IChartProps): JSX.Element | null {
  if (!votes.total) return null

  return (
    <div style={{ flex: 1 }}>
      {cards.map((card) => (
        <VoteBar
          key={card}
          card={card}
          quantity={hidden ? undefined : votes[card]}
          max={votes.total}
          setHovered={setHovered}
        />
      ))}
    </div>
  )
}
