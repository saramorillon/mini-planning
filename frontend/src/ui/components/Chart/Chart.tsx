import { ProgressBar } from '@blueprintjs/core'
import React, { Dispatch, SetStateAction } from 'react'
import { Votes } from '../../../utils/getVotes'
import { SmallCard } from '../Card/Card'
import { cards } from '../Cards/Cards'

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

interface IVoteBarProps {
  card: string
  quantity?: number
  max: number
  setHovered: Dispatch<SetStateAction<string | undefined>>
}

function VoteBar({ card, quantity = 0, max, setHovered }: IVoteBarProps) {
  return (
    <div className="flex items-center mb1">
      <SmallCard
        className="mr2"
        onMouseEnter={() => setHovered(card)}
        onMouseLeave={() => setHovered(undefined)}
        onClick={() => setHovered(card)}
      >
        {card}
      </SmallCard>
      <ProgressBar intent="primary" value={quantity / max} stripes={false} />
      {quantity > 0 && (
        <span className="nowrap ml2">
          {quantity} / {max}
        </span>
      )}
    </div>
  )
}
