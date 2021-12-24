import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { VoteButton } from '../../../../../src/ui/components/VoteButton/VoteButton'

describe('VoteButton', () => {
  it('should enable "Show votes" button when voting', () => {
    render(<VoteButton voting onClick={jest.fn()} />)
    expect(screen.getByRole('button', { name: 'Show votes' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDisabled()
  })

  it('should disable "Show votes" button when disabled is true', () => {
    render(<VoteButton voting onClick={jest.fn()} disabled />)
    expect(screen.getByRole('button', { name: 'Show votes' })).toBeDisabled()
  })

  it('should show "Reset" button when not voting', () => {
    render(<VoteButton voting={false} onClick={jest.fn()} />)
    expect(screen.getByRole('button', { name: 'Show votes' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeEnabled()
  })

  it('should call onClick with true when voting', () => {
    const onClick = jest.fn()
    render(<VoteButton voting onClick={onClick} />)
    fireEvent.click(screen.getByRole('button', { name: 'Show votes' }))
    expect(onClick).toHaveBeenCalledWith(true)
  })

  it('should call onClick with false when not voting', () => {
    const onClick = jest.fn()
    render(<VoteButton voting={false} onClick={onClick} />)
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(onClick).toHaveBeenCalledWith(false)
  })
})
