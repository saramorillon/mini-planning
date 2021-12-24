import { Classes } from '@blueprintjs/core'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Cards } from '../../../../../src/ui/components/Cards/Cards'

describe('Cards', () => {
  it('should render a disabled card if active is false', () => {
    render(<Cards vote="5" onVote={jest.fn()} active={false} />)
    expect(screen.getByRole('button', { name: '0' })).toBeDisabled()
  })

  it('should render an enabled card if active is true', () => {
    render(<Cards vote="5" onVote={jest.fn()} active={true} />)
    expect(screen.getByRole('button', { name: '0' })).toBeEnabled()
  })

  it('should render an outlined card if card is not selected', () => {
    render(<Cards vote="5" onVote={jest.fn()} active={true} />)
    expect(screen.getByRole('button', { name: '0' })).toHaveClass(Classes.OUTLINED)
  })

  it('should render a solid card if card is selected', () => {
    render(<Cards vote="5" onVote={jest.fn()} active={true} />)
    expect(screen.getByRole('button', { name: '5' })).not.toHaveClass(Classes.OUTLINED)
  })

  it('should call onVote when clicking on card if active is true', () => {
    const onVote = jest.fn()
    render(<Cards vote="5" onVote={onVote} active={true} />)
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    expect(onVote).toHaveBeenCalledWith('2')
  })

  it('should not call onVote when clicking on card if active is false', () => {
    const onVote = jest.fn()
    render(<Cards vote="5" onVote={onVote} active={false} />)
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    expect(onVote).not.toHaveBeenCalled()
  })
})
