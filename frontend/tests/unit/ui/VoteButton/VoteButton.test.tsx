import { VoteButton } from '@src/ui/VoteButton/VoteButton'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

describe('VoteButton', () => {
  it('should enable "Show votes" button when voting', () => {
    render(<VoteButton voting onClick={jest.fn()} />)
    expect(screen.getByText('Show votes')).toBeEnabled()
    expect(screen.getByText('Reset')).toBeDisabled()
  })

  it('should disable "Show votes" button when disabled is true', () => {
    render(<VoteButton voting onClick={jest.fn()} disabled />)
    expect(screen.getByText('Show votes')).toBeDisabled()
  })

  it('should show "Reset" button when not voting', () => {
    render(<VoteButton voting={false} onClick={jest.fn()} />)
    expect(screen.getByText('Show votes')).toBeDisabled()
    expect(screen.getByText('Reset')).toBeEnabled()
  })

  it('should call onClick with true when voting', () => {
    const onClick = jest.fn()
    render(<VoteButton voting onClick={onClick} />)
    fireEvent.click(screen.getByText('Show votes'))
    expect(onClick).toHaveBeenCalledWith(true)
  })

  it('should call onClick with false when not voting', () => {
    const onClick = jest.fn()
    render(<VoteButton voting={false} onClick={onClick} />)
    fireEvent.click(screen.getByText('Reset'))
    expect(onClick).toHaveBeenCalledWith(false)
  })
})
