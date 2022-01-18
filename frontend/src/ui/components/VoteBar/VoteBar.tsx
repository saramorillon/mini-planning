import { ProgressBar } from '@blueprintjs/core'
import React, { Dispatch, SetStateAction } from 'react'
import { SmallCard } from '../Card/Card'

interface IVoteBarProps {
  card: string
  quantity?: number
  max: number
  setHovered: Dispatch<SetStateAction<string | undefined>>
}

export function VoteBar({ card, quantity = 0, max, setHovered }: IVoteBarProps) {
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
