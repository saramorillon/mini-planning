import React, { useCallback } from 'react'
import { Card } from '../Card/Card'

export const cards = ['0', '1', '2', '3', '5', '8', '13', '21', '?'] as const

interface ICardsProps {
  vote?: string
  onVote: (vote: string) => void
  active: boolean
}

export function Cards({ vote, onVote, active }: ICardsProps): JSX.Element {
  const onClick = useCallback(
    (card: string) => {
      onVote(card)
    },
    [onVote]
  )

  return (
    <>
      <h1>Choose a card</h1>
      <div className="flex justify-center">
        {cards.map((card) => (
          <Card
            key={card}
            className="m2"
            disabled={!active}
            outlined={vote !== card}
            intent={vote === card ? 'primary' : 'none'}
            onClick={() => onClick(card)}
            large
          >
            {card}
          </Card>
        ))}
      </div>
    </>
  )
}
