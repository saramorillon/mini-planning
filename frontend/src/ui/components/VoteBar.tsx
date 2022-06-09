import React, { Dispatch, SetStateAction } from 'react'

interface IVoteBarProps {
  card: string
  quantity?: number
  max: number
  setHovered: Dispatch<SetStateAction<string | undefined>>
}

export function VoteBar({ card, quantity = 0, max, setHovered }: IVoteBarProps) {
  return (
    <div key={card} className="flex items-center mb1">
      <div
        className="mr2 card small"
        onMouseEnter={() => setHovered(card)}
        onMouseLeave={() => setHovered(undefined)}
        onClick={() => setHovered(card)}
      >
        {card}
      </div>
      <progress value={quantity / max} />
      {quantity > 0 && (
        <span className="nowrap ml2">
          {quantity} / {max}
        </span>
      )}
    </div>
  )
}
