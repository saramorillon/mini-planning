import React, { useCallback } from 'react'
import { Card } from '../Card/Card'

export const cards = ['0', '1', '2', '3', '5', '8', '13', '21', '?']

interface ICardsProps {
  vote?: string
  onVote: (vote: string) => void
  active: boolean
}

export function Cards({ vote, onVote, active }: ICardsProps): JSX.Element {
  const onClick = useCallback(
    (card: string) => {
      if (active) onVote(card)
    },
    [active, onVote]
  )

  return (
    <div className="flex justify-center">
      {cards.map((card) => (
        <Card key={card} className="m2" disabled={!active} outlined={vote !== card} onClick={() => onClick(card)} large>
          {card}
        </Card>
      ))}
    </div>
  )
}
