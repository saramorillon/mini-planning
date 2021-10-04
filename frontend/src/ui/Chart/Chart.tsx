import styled from '@emotion/styled'
import React from 'react'
import { cards } from '../Cards/Cards'
import { SmallCard } from '../Card/Card'

interface IChartProps {
  votes: Record<string, number>
  hidden: boolean
  setHovered: (hovered?: string) => void
}

export function Chart({ votes, hidden, setHovered }: IChartProps): JSX.Element | null {
  if (!votes.total) {
    return null
  }

  return (
    <div className="d-flex">
      {cards.map((card) => (
        <VoteBar key={card} card={card} quantity={!hidden && votes[card]} max={votes.total} setHovered={setHovered} />
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
    ':hover': {
      cursor: 'pointer',
      transform: 'scale(1.05)',
    },
  },
  ({ height }: { height: number }) => ({ height: height + '%' })
)

interface IVoteBarProps {
  card: string
  quantity?: number
  max: number
  setHovered: (hovered?: string) => void
}

function VoteBar({ card, quantity = 0, max, setHovered }: IVoteBarProps) {
  return (
    <div className="d-flex flex-column align-items-center">
      <Bg>
        <Fg
          data-testid={`votebar-fg-${card}`}
          onMouseEnter={() => setHovered(card)}
          onMouseLeave={() => setHovered(undefined)}
          height={(quantity * 100) / max}
        />
      </Bg>
      <SmallCard outline className="mt-2">
        {card}
      </SmallCard>
      <b>{quantity || ''}</b>
    </div>
  )
}
