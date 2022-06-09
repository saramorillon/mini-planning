import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IRoomProps, useRoomSocket } from '../../../../src/hooks/useRoomSocket'
import { Room } from '../../../../src/ui/pages/Room'
import { mock } from '../../../mocks'

jest.mock('../../../../src/hooks/useRoomSocket')

function mockRoomSocket(props?: Partial<IRoomProps>): IRoomProps {
  const roomPropsMock = {
    voting: false,
    users: [],
    vote: '',
    canShowVotes: false,
    onChangeStatus: jest.fn(),
    onVote: jest.fn(),
    ...props,
  }
  mock(useRoomSocket).mockReturnValue(roomPropsMock)
  return roomPropsMock
}

describe('Room', () => {
  beforeEach(() => {
    mockRoomSocket()
  })

  it('should not show cards to observers', () => {
    mockRoomSocket()
    render(<Room user={{ name: 'Toto', observer: true }} />)
    expect(screen.queryByText('Choose a card')).not.toBeInTheDocument()
  })

  it('should show active cards when voting', () => {
    mockRoomSocket({ voting: true })
    render(<Room user={{ name: 'Toto', observer: false }} />)
    expect(screen.getByRole('button', { name: '0' })).toBeEnabled()
  })

  it('should show inactive cards when not voting', () => {
    mockRoomSocket({ voting: false })
    render(<Room user={{ name: 'Toto', observer: false }} />)
    expect(screen.getByRole('button', { name: '0' })).toBeDisabled()
  })

  it('should vote when clicking on card', () => {
    const roomPropsMock = mockRoomSocket({ voting: true })
    render(<Room user={{ name: 'Toto', observer: false }} />)
    fireEvent.click(screen.getByText('0'))
    expect(roomPropsMock.onVote).toHaveBeenCalledWith('0')
  })

  it('should change voting status when clicking on "Show votes" button', () => {
    const roomPropsMock = mockRoomSocket({ voting: true, canShowVotes: true })
    render(<Room user={{ name: 'Toto', observer: false }} />)
    fireEvent.click(screen.getByText('Show votes'))
    expect(roomPropsMock.onChangeStatus).toHaveBeenCalled()
  })

  it('should change voting status when clicking on "Reset" button', () => {
    const roomPropsMock = mockRoomSocket()
    render(<Room user={{ name: 'Toto', observer: false }} />)
    fireEvent.click(screen.getByText('Reset'))
    expect(roomPropsMock.onChangeStatus).toHaveBeenCalled()
  })

  it('should hide votes when voting', () => {
    mockRoomSocket({ voting: true, users: [{ name: 'Titi', observer: false, vote: '0' }] })
    render(<Room user={{ name: 'Toto', observer: false }} />)
    expect(screen.getByText('✓')).toBeInTheDocument()
  })

  it('should disable vote button when voting is false', () => {
    mockRoomSocket()
    render(<Room user={{ name: 'Toto', observer: false }} />)
    expect(screen.getByRole('button', { name: 'Show votes' })).toBeDisabled()
  })

  it('should disable vote button when voting is true but show vote is not allowed', () => {
    mockRoomSocket({ voting: true })
    render(<Room user={{ name: 'Toto', observer: false }} />)
    expect(screen.getByRole('button', { name: 'Show votes' })).toBeDisabled()
  })

  it('should enable vote button when show voting is true and vote is allowed', () => {
    mockRoomSocket({ voting: true, canShowVotes: true })
    render(<Room user={{ name: 'Toto', observer: false }} />)
    expect(screen.getByRole('button', { name: 'Show votes' })).toBeEnabled()
  })

  it('should disable reset button when voting is true', () => {
    mockRoomSocket({ voting: true })
    render(<Room user={{ name: 'Toto', observer: false }} />)
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDisabled()
  })

  it('should enable reset button when voting is false', () => {
    mockRoomSocket()
    render(<Room user={{ name: 'Toto', observer: false }} />)
    expect(screen.getByRole('button', { name: 'Reset' })).toBeEnabled()
  })
})
