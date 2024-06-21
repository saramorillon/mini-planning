import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Cards } from '../../../../src/ui/components/Cards.js'

describe('Cards', () => {
  it('should render a disabled card if active is false', () => {
    render(<Cards vote="5" onVote={vi.fn()} active={false} />)
    expect(screen.getByRole('button', { name: '0' })).toBeDisabled()
  })

  it('should render an enabled card if active is true', () => {
    render(<Cards vote="5" onVote={vi.fn()} active />)
    expect(screen.getByRole('button', { name: '0' })).toBeEnabled()
  })

  it('should render a normal outlined card if card is not selected', () => {
    render(<Cards vote="5" onVote={vi.fn()} active />)
    expect(screen.getByRole('button', { name: '0' })).toHaveAttribute('data-variant', 'outlined')
  })

  it('should render a primary solid card if card is selected', () => {
    render(<Cards vote="5" onVote={vi.fn()} active />)
    expect(screen.getByRole('button', { name: '5' })).toHaveAttribute('data-variant', 'primary')
  })

  it('should call onVote when clicking on card', () => {
    const onVote = vi.fn()
    render(<Cards vote="5" onVote={onVote} active />)
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    expect(onVote).toHaveBeenCalledWith('2')
  })
})
