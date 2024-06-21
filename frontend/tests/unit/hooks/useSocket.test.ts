import { EventEmitter } from 'node:events'
import { act, renderHook } from '@testing-library/react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useSocket } from '../../../src/hooks/useSocket.js'
import { mock, mockUser, wait } from '../../mocks.js'

vi.mock('react-router-dom')

function mockSocket() {
  const socketMock = new EventEmitter()
  vi.spyOn(socketMock, 'on')
  vi.spyOn(socketMock, 'emit')
  Object.defineProperty(socketMock, 'id', { value: 'id' })
  Object.defineProperty(socketMock, 'disconnect', { value: vi.fn() })
  mock(io).mockReturnValue(socketMock)
  return socketMock
}

describe('useSocket', () => {
  beforeEach(() => {
    mock(useParams).mockReturnValue({ id: 'id' })
    mockSocket()
  })

  it('should create socket', async () => {
    mockSocket()
    renderHook(() => useSocket({ name: 'name', observer: false }))
    await wait()
    expect(io).toHaveBeenCalledWith('/id', { transports: ['polling'] })
  })

  it('should listen to socket connection', async () => {
    const socketMock = mockSocket()
    renderHook(() => useSocket({ name: 'name', observer: false }))
    await wait()
    expect(socketMock.on).toHaveBeenCalledWith('connect', expect.any(Function))
  })

  it('should join user on socket connection', async () => {
    const socketMock = mockSocket()
    renderHook(() => useSocket({ name: 'name', observer: false }))
    await wait()
    socketMock.emit('connect')
    expect(socketMock.emit).toHaveBeenCalledWith('join', { name: 'name', observer: false })
  })

  it('should refresh users on refresh event', async () => {
    const socketMock = mockSocket()
    const { result } = renderHook(() => useSocket({ name: 'name', observer: false }))
    await wait()
    act(() => {
      socketMock.emit('refresh', { users: { id: mockUser() } })
    })
    expect(result.current.users).toEqual([mockUser()])
  })

  it('should refresh voting state on refresh event', async () => {
    const socketMock = mockSocket()
    const { result } = renderHook(() => useSocket({ name: 'name', observer: false }))
    await wait()
    act(() => {
      socketMock.emit('refresh', { users: {}, voting: false })
    })
    expect(result.current.voting).toBe(false)
  })

  it('should return empty when user did not vote yet', async () => {
    mockSocket()
    const { result } = renderHook(() => useSocket({ name: 'name', observer: false }))
    await wait()
    expect(result.current.vote).toBe('')
  })

  it("should return user's vote", async () => {
    const socketMock = mockSocket()
    const { result } = renderHook(() => useSocket({ name: 'name', observer: false }))
    await wait()
    act(() => {
      socketMock.emit('refresh', { users: { id: mockUser({ vote: '5' }) } })
    })
    expect(result.current.vote).toBe('5')
  })

  it('should emit voting event on status change', async () => {
    const socketMock = mockSocket()
    const { result } = renderHook(() => useSocket({ name: 'name', observer: false }))
    await wait()
    result.current.onChangeStatus()
    expect(socketMock.emit).toHaveBeenCalledWith('voting', false)
  })

  it('should emit vote event on vote', async () => {
    const socketMock = mockSocket()
    const { result } = renderHook(() => useSocket({ name: 'name', observer: false }))
    await wait()
    result.current.onVote('5')
    expect(socketMock.emit).toHaveBeenCalledWith('vote', '5')
  })
})
