import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { type IRoomProps, useSocket } from '../../../../src/hooks/useSocket.js'
import { Room } from '../../../../src/ui/pages/Room.js'
import { mock, mockUser } from '../../../mocks.js'

vi.mock('../../../../src/hooks/useSocket.js')

function mockSocket(props?: Partial<IRoomProps>): IRoomProps {
  const roomPropsMock = {
    voting: false,
    users: [],
    vote: '',
    onChangeStatus: vi.fn(),
    onVote: vi.fn(),
    ...props,
  }
  mock(useSocket).mockReturnValue(roomPropsMock)
  return roomPropsMock
}

describe('Room', () => {
  beforeEach(() => {
    mockSocket()
  })

  it('should not show cards to observers', () => {
    render(<Room user={mockUser({ observer: true })} />)
    expect(screen.queryByText('Choose a card')).not.toBeInTheDocument()
  })

  it('should show active cards when voting', () => {
    mockSocket({ voting: true })
    render(<Room user={mockUser()} />)
    expect(screen.getByRole('button', { name: '0' })).toBeEnabled()
  })

  it('should show inactive cards when not voting', () => {
    mockSocket({ voting: false })
    render(<Room user={mockUser()} />)
    expect(screen.getByRole('button', { name: '0' })).toBeDisabled()
  })

  it('should vote when clicking on card', () => {
    const roomPropsMock = mockSocket({ voting: true })
    render(<Room user={mockUser()} />)
    fireEvent.click(screen.getByText('0'))
    expect(roomPropsMock.onVote).toHaveBeenCalledWith('0')
  })

  it('should change voting status when clicking on "Show votes" button', () => {
    const roomPropsMock = mockSocket({ voting: true, users: [mockUser({ vote: '5' })] })
    render(<Room user={mockUser()} />)
    fireEvent.click(screen.getByText('Show votes'))
    expect(roomPropsMock.onChangeStatus).toHaveBeenCalled()
  })

  it('should change voting status when clicking on "Reset" button', () => {
    const roomPropsMock = mockSocket()
    render(<Room user={mockUser()} />)
    fireEvent.click(screen.getByText('Reset all votes'))
    expect(roomPropsMock.onChangeStatus).toHaveBeenCalled()
  })

  it('should hide votes when voting', () => {
    mockSocket({ voting: true, users: [{ name: 'Titi', observer: false, vote: '0' }] })
    render(<Room user={mockUser()} />)
    expect(screen.getByText('✓')).toBeInTheDocument()
  })

  it('should disable vote button when voting is false', () => {
    render(<Room user={mockUser()} />)
    expect(screen.getByRole('button', { name: 'Show votes' })).toBeDisabled()
  })

  it('should disable reset button when voting is true', () => {
    mockSocket({ voting: true })
    render(<Room user={mockUser()} />)
    expect(screen.getByRole('button', { name: 'Reset all votes' })).toBeDisabled()
  })

  it('should enable reset button when voting is false', () => {
    render(<Room user={mockUser()} />)
    expect(screen.getByRole('button', { name: 'Reset all votes' })).toBeEnabled()
  })
})
