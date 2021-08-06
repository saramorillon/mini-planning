import { Cards } from '@src/ui/Cards/Cards'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

describe('Cards', () => {
  it('should render a disabled card if active is false', () => {
    render(<Cards vote="5" onVote={jest.fn()} active={false} />)
    expect(screen.getByText('0')).toBeDisabled()
  })

  it('should render an enabled card if active is true', () => {
    render(<Cards vote="5" onVote={jest.fn()} active={true} />)
    expect(screen.getByText('0')).toBeEnabled()
  })

  it('should render an outlined card if card is not selected', () => {
    render(<Cards vote="5" onVote={jest.fn()} active={true} />)
    expect(screen.getByText('0')).toHaveClass('btn-outline-dark')
  })

  it('should render a solid card if card is selected', () => {
    render(<Cards vote="5" onVote={jest.fn()} active={true} />)
    expect(screen.getByText('5')).not.toHaveClass('btn-outline-dark')
  })

  it('should call onVote when clicking on card if active is true', () => {
    const onVote = jest.fn()
    render(<Cards vote="5" onVote={onVote} active={true} />)
    fireEvent.click(screen.getByText('2'))
    expect(onVote).toHaveBeenCalledWith('2')
  })

  it('should not call onVote when clicking on card if active is false', () => {
    const onVote = jest.fn()
    render(<Cards vote="5" onVote={onVote} active={false} />)
    fireEvent.click(screen.getByText('2'))
    expect(onVote).not.toHaveBeenCalled()
  })
})
