import styled from '@emotion/styled'
import React from 'react'
import { cards } from '../Cards/Cards'
import { SmallCard } from '@src/Card/Card'

interface IChartProps {
  votes: Record<string, number>
  hidden: boolean
}

export function Chart({ votes, hidden }: IChartProps): JSX.Element | null {
  if (!votes.total) {
    return null
  }

  return (
    <div className="d-flex">
      {cards.map((card) => (
        <VoteBar key={card} card={card} quantity={!hidden && votes[card]} max={votes.total} />
      ))}
    </div>
  )
}

const Bg = styled.div({
  position: 'relative',
  width: '1rem',
  height: 250,
  margin: '0 1rem',
  backgroundColor: 'lightgray',
  borderRadius: '0.75rem',
})

const Fg = styled.div(
  {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#007bff',
    borderRadius: '0.75rem',
    bottom: 0,
    transition: 'all 0.3s ease-out',
  },
  ({ height }: { height: number }) => ({ height: height + '%' })
)

function VoteBar({ card, quantity = 0, max }: { card: string; quantity?: number; max: number }) {
  return (
    <div className="d-flex flex-column align-items-center">
      <Bg>
        <Fg data-testid={`votebar-fg-${card}`} height={(quantity * 100) / max} />
      </Bg>
      <SmallCard outline className="mt-2">
        {card}
      </SmallCard>
      <b>{quantity || ''}</b>
    </div>
  )
}
