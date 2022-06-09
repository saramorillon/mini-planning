import { act, renderHook } from '@testing-library/react-hooks'
import axios from 'axios'
import { EventEmitter } from 'events'
import { useParams } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import { useRoomSocket } from '../../../src/hooks/useRoomSocket'
import { mock, mockUser, wait } from '../../mocks'

jest.mock('axios')
jest.mock('react-router-dom')

function mockSocket() {
  const socketMock = new EventEmitter()
  jest.spyOn(socketMock, 'on')
  jest.spyOn(socketMock, 'emit')
  Object.defineProperty(socketMock, 'id', { value: 'id' })
  Object.defineProperty(socketMock, 'disconnect', { value: jest.fn() })
  mock(io).mockReturnValue(socketMock)
  return socketMock
}

describe('useRoomSocket', () => {
  beforeEach(() => {
    mock(useParams).mockReturnValue({ id: 'id' })
    mock(axios.post).mockResolvedValue(undefined)
    mockSocket()
  })

  it('should create room', async () => {
    mockSocket()
    renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    expect(axios.post).toHaveBeenCalledWith('/api/room/id')
  })

  it('should create socket', async () => {
    mockSocket()
    renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    expect(io).toHaveBeenCalledWith('/id', { transports: ['polling'] })
  })

  it('should listen to socket connection', async () => {
    const socketMock = mockSocket()
    renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    expect(socketMock.on).toHaveBeenCalledWith('connect', expect.any(Function))
  })

  it('should join user on socket connection', async () => {
    const socketMock = mockSocket()
    renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    socketMock.emit('connect')
    expect(socketMock.emit).toHaveBeenCalledWith('join', { name: 'name', observer: false })
  })

  it('should refresh users on refresh event', async () => {
    const socketMock = mockSocket()
    const { result } = renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    act(() => {
      socketMock.emit('refresh', { users: { id: mockUser() } })
    })
    expect(result.current.users).toEqual([mockUser()])
  })

  it('should refresh voting state on refresh event', async () => {
    const socketMock = mockSocket()
    const { result } = renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    act(() => {
      socketMock.emit('refresh', { users: {}, voting: false })
    })
    expect(result.current.voting).toBe(false)
  })

  it('should return empty vote when socket is not yet initialized', async () => {
    mock(io).mockReturnValue(undefined)
    const { result } = renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    expect(result.current.vote).toBe('')
  })

  it('should return empty when user did not vote yet', async () => {
    mockSocket()
    const { result } = renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    expect(result.current.vote).toBe('')
  })

  it("should return user's vote", async () => {
    const socketMock = mockSocket()
    const { result } = renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    act(() => {
      socketMock.emit('refresh', { users: { id: mockUser({ vote: '5' }) } })
    })
    expect(result.current.vote).toBe('5')
  })

  it('should disallow show vote if some users did not vote', async () => {
    const socketMock = mockSocket()
    const { result } = renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    act(() => {
      socketMock.emit('refresh', { users: { id: mockUser() } })
    })
    expect(result.current.canShowVotes).toBe(false)
  })

  it('should allow show vote if all users have voted', async () => {
    const socketMock = mockSocket()
    const { result } = renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    act(() => {
      socketMock.emit('refresh', { users: { id: mockUser({ vote: '5' }) } })
    })
    expect(result.current.canShowVotes).toBe(true)
  })

  it('should allow show vote if all users have voted expected observer', async () => {
    const socketMock = mockSocket()
    const { result } = renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    act(() => {
      socketMock.emit('refresh', { users: { id: mockUser({ vote: '5' }), id2: mockUser({ observer: true }) } })
    })
    expect(result.current.canShowVotes).toBe(true)
  })

  it('should not emit voting event if socket is not yet initialized', async () => {
    mock(io).mockReturnValue(undefined)
    const { result } = renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    result.current.onChangeStatus()
    expect(Socket.prototype.emit).not.toHaveBeenCalled()
  })

  it('should emit voting event on status change', async () => {
    const socketMock = mockSocket()
    const { result } = renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    result.current.onChangeStatus()
    expect(socketMock.emit).toHaveBeenCalledWith('voting', false)
  })

  it('should not emit vote event if socket is not yet initialized', async () => {
    mock(io).mockReturnValue(undefined)
    const { result } = renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    result.current.onVote('5')
    expect(Socket.prototype.emit).not.toHaveBeenCalled()
  })

  it('should emit vote event on vote', async () => {
    const socketMock = mockSocket()
    const { result } = renderHook(() => useRoomSocket({ name: 'name', observer: false }))
    await wait()
    result.current.onVote('5')
    expect(socketMock.emit).toHaveBeenCalledWith('vote', '5')
  })
})
