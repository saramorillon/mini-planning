import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { cards } from '../Cards/Cards'

interface IChartProps {
  users: [string, string][]
  hidden: boolean
}

export function Chart({ users, hidden }: IChartProps): JSX.Element | null {
  const votes = useMemo(
    () => cards.map((card) => ({ card, quantity: users.filter(([, vote]) => vote === card).length })),
    [users]
  )

  if (!users.length) {
    return null
  }

  return (
    <div className="d-flex">
      {votes.map(({ card, quantity }) => (
        <VoteBar key={card} card={card} quantity={hidden ? 0 : quantity} max={users.length} />
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

function VoteBar({ card, quantity, max }: { card: string; quantity: number; max: number }) {
  return (
    <div className="d-flex flex-column align-items-center">
      <Bg>
        <Fg height={(quantity * 100) / max} />
      </Bg>
      <b>{card}</b>
    </div>
  )
}
