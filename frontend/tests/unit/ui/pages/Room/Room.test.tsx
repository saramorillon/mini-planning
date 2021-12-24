import { act, fireEvent, screen } from '@testing-library/react'
import axios from 'axios'
import { EventEmitter } from 'events'
import React from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import { Room } from '../../../../../src/ui/pages/Room/Room'
import { mock, renderAsync } from '../../../../mocks'

jest.mock('react-router-dom')

describe('Room', () => {
  let socketMock: EventEmitter

  beforeEach(() => {
    mock(useParams).mockReturnValue({ id: 'id' })
    mock(io).mockReturnValue((socketMock = new EventEmitter()))
    mock(axios.post).mockResolvedValue(undefined)
  })

  it('should connect to room namespace', async () => {
    await renderAsync(<Room user={{ name: 'Toto', observer: false }} />)
    expect(io).toHaveBeenCalledWith('/id', { transports: ['polling'] })
  })

  it('should connect socket', async () => {
    const onSpy = jest.spyOn(socketMock, 'on')
    await renderAsync(<Room user={{ name: 'Toto', observer: false }} />)
    expect(onSpy).toHaveBeenCalledWith('connect', expect.any(Function))
  })

  it('should join room', async () => {
    const emitSpy = jest.spyOn(socketMock, 'emit')
    await renderAsync(<Room user={{ name: 'Toto', observer: false }} />)
    act(() => {
      socketMock.emit('connect')
    })
    expect(emitSpy).toHaveBeenCalledWith('join', { name: 'Toto', observer: false })
  })

  it('should show active cards when voting', async () => {
    await renderAsync(<Room user={{ name: 'Toto', observer: false }} />)
    expect(screen.getByRole('button', { name: '0' })).toBeEnabled()
  })

  it('should show inactive cards when not voting', async () => {
    await renderAsync(<Room user={{ name: 'Toto', observer: false }} />)
    act(() => {
      socketMock.emit('connect')
    })
    act(() => {
      socketMock.emit('refresh', { voting: false, users: [], votes: { total: 0 } })
    })
    expect(screen.getByRole('button', { name: '0' })).toBeDisabled()
  })

  it('should emit vote event when clicking on card', async () => {
    const emitSpy = jest.spyOn(socketMock, 'emit')
    await renderAsync(<Room user={{ name: 'Toto', observer: false }} />)
    act(() => {
      socketMock.emit('connect')
    })
    fireEvent.click(screen.getByText('0'))
    expect(emitSpy).toHaveBeenCalledWith('vote', { name: 'Toto', observer: false, vote: '0' })
  })

  it('should emit voting event when clicking on "Show votes" button', async () => {
    const emitSpy = jest.spyOn(socketMock, 'emit')
    await renderAsync(<Room user={{ name: 'Toto', observer: false }} />)
    act(() => {
      socketMock.emit('connect')
    })
    fireEvent.click(screen.getByText('Show votes'))
    expect(emitSpy).toHaveBeenCalledWith('voting', false)
  })

  it('should emit voting event when clicking on "Reset" button', async () => {
    const emitSpy = jest.spyOn(socketMock, 'emit')
    await renderAsync(<Room user={{ name: 'Toto', observer: false }} />)
    act(() => {
      socketMock.emit('connect')
    })
    act(() => {
      socketMock.emit('refresh', { voting: false, users: [], votes: { total: 0 } })
    })
    fireEvent.click(screen.getByText('Reset'))
    expect(emitSpy).toHaveBeenCalledWith('voting', true)
  })

  it('should refresh users', async () => {
    const users = [{ name: 'Titi', observer: false, vote: '' }]
    await renderAsync(<Room user={{ name: 'Toto', observer: false }} />)
    act(() => {
      socketMock.emit('connect')
    })
    act(() => {
      socketMock.emit('refresh', { voting: false, users, votes: { total: 1, '': 1 } })
    })
    expect(screen.getByText('Titi')).toBeInTheDocument()
  })

  it('should hide votes when voting', async () => {
    const users = [{ name: 'Titi', observer: false, vote: '0' }]
    await renderAsync(<Room user={{ name: 'Toto', observer: false }} />)
    act(() => {
      socketMock.emit('connect')
    })
    act(() => {
      socketMock.emit('refresh', { voting: true, users, votes: { total: 1, '0': 1 } })
    })
    expect(screen.getByText('✓')).toBeInTheDocument()
  })

  it('should disable vote button when a voter did not vote yet', async () => {
    const users = [
      { name: 'Titi', observer: false, vote: '0' },
      { name: 'Toto', observer: false, vote: '' },
    ]
    await renderAsync(<Room user={{ name: 'Toto', observer: false }} />)
    act(() => {
      socketMock.emit('connect')
    })
    act(() => {
      socketMock.emit('refresh', { voting: true, users, votes: { total: 1, '0': 1 } })
    })
    expect(screen.getByRole('button', { name: 'Show votes' })).toBeDisabled()
  })

  it('should enable vote button when all voters vote', async () => {
    const users = [
      { name: 'Titi', observer: false, vote: '0' },
      { name: 'Toto', observer: false, vote: '2' },
    ]
    await renderAsync(<Room user={{ name: 'Toto', observer: false }} />)
    act(() => {
      socketMock.emit('connect')
    })
    act(() => {
      socketMock.emit('refresh', { voting: true, users, votes: { total: 1, '0': 1 } })
    })
    expect(screen.getByRole('button', { name: 'Show votes' })).toBeEnabled()
  })

  it('should enable vote button when all voters vote and an observer is present', async () => {
    const users = [
      { name: 'Titi', observer: false, vote: '0' },
      { name: 'Toto', observer: false, vote: '2' },
      { name: 'Tutu', observer: true, vote: '' },
    ]
    await renderAsync(<Room user={{ name: 'Toto', observer: false }} />)
    act(() => {
      socketMock.emit('connect')
    })
    act(() => {
      socketMock.emit('refresh', { voting: true, users, votes: { total: 1, '0': 1 } })
    })
    expect(screen.getByRole('button', { name: 'Show votes' })).toBeEnabled()
  })
})
