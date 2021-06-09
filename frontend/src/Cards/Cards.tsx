import React, { useCallback } from 'react'
import { Card } from '../Card/Card'

export const cards = ['0', '1', '2', '3', '5', '8', '13', '21', '?']

interface ICardsProps {
  vote: string
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
    <div>
      {cards.map((card) => (
        <Card key={card} color="dark" disabled={!active} outline={vote !== card} onClick={() => onClick(card)}>
          {card}
        </Card>
      ))}
    </div>
  )
}
