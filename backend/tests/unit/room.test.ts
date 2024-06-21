import { room, rooms } from '../../src/room.js'
import { mockSocket } from '../mocks.js'

describe('room', () => {
  beforeEach(() => {
    for (const key of Object.keys(rooms)) {
      delete rooms[key]
    }
  })

  it('should create room if room does not exist', () => {
    room(mockSocket())
    expect(rooms['/namespace']).toEqual({ voting: true, users: {} })
  })

  describe('join', () => {
    it('should add user to rooms users if user does not exist', () => {
      const socket = mockSocket()
      room(socket)
      socket.emit('join', { name: 'name', observer: false })
      expect(rooms['/namespace'].users['socket-id']).toEqual({ name: 'name', observer: false, vote: '' })
    })

    it('should emit refresh event if user does not exist', () => {
      const socket = mockSocket()
      room(socket)
      socket.emit('join', { name: 'name', observer: false })
      expect(socket.nsp.emit).toHaveBeenCalledWith('refresh', {
        users: { 'socket-id': { name: 'name', observer: false, vote: '' } },
        voting: true,
      })
    })

    it('should not emit refresh event if user already exists', () => {
      const socket = mockSocket()
      room(socket)
      rooms['/namespace'].users['socket-id'] = { name: 'name', observer: false, vote: '' }
      socket.emit('join', { name: 'name', observer: false })
      expect(socket.nsp.emit).not.toHaveBeenCalled()
    })
  })

  describe('vote', () => {
    it('should change vote if user exists', () => {
      const socket = mockSocket()
      room(socket)
      rooms['/namespace'].users['socket-id'] = { name: 'name', observer: false, vote: '' }
      socket.emit('vote', '5')
      expect(rooms['/namespace'].users['socket-id'].vote).toBe('5')
    })

    it('should emit refresh event if user already exists', () => {
      const socket = mockSocket()
      room(socket)
      rooms['/namespace'].users['socket-id'] = { name: 'name', observer: false, vote: '' }
      socket.emit('vote', '5')
      expect(socket.nsp.emit).toHaveBeenCalledWith('refresh', {
        users: { 'socket-id': { name: 'name', observer: false, vote: '5' } },
        voting: true,
      })
    })

    it('should not emit refresh event if user does not exist', () => {
      const socket = mockSocket()
      room(socket)
      socket.emit('vote', '5')
      expect(socket.nsp.emit).not.toHaveBeenCalled()
    })
  })

  describe('disconnect', () => {
    it('should remove user from room if user already exists', () => {
      const socket = mockSocket()
      room(socket)
      rooms['/namespace'].users['socket-id'] = { name: 'name', observer: false, vote: '' }
      rooms['/namespace'].users['socket-id2'] = { name: 'name2', observer: false, vote: '' }
      socket.emit('disconnect')
      expect(rooms['/namespace'].users['socket-id']).toBeUndefined()
    })

    it('should remove room if no more user is present', () => {
      const socket = mockSocket()
      room(socket)
      rooms['/namespace'].users['socket-id'] = { name: 'name', observer: false, vote: '' }
      socket.emit('disconnect')
      expect(rooms['/namespace']).toBeUndefined()
    })

    it('should emit refresh event if user already exists', () => {
      const socket = mockSocket()
      room(socket)
      rooms['/namespace'].users['socket-id'] = { name: 'name', observer: false, vote: '' }
      socket.emit('disconnect')
      expect(socket.nsp.emit).toHaveBeenCalledWith('refresh', { users: {}, voting: true })
    })

    it('should not emit refresh event if user does not exist', () => {
      const socket = mockSocket()
      room(socket)
      socket.emit('disconnect')
      expect(socket.nsp.emit).not.toHaveBeenCalled()
    })
  })

  describe('voting', () => {
    it('should change voting state', () => {
      const socket = mockSocket()
      room(socket)
      socket.emit('voting', false)
      expect(rooms['/namespace'].voting).toBe(false)
    })

    it('should reset users votes if voting', () => {
      const socket = mockSocket()
      room(socket)
      rooms['/namespace'].users['socket-id'] = { name: 'name', observer: false, vote: '5' }
      socket.emit('voting', true)
      expect(rooms['/namespace'].users['socket-id'].vote).toBe('')
    })

    it('should emit refresh event', () => {
      const socket = mockSocket()
      room(socket)
      rooms['/namespace'].users['socket-id'] = { name: 'name', observer: false, vote: '' }
      socket.emit('voting', false)
      expect(socket.nsp.emit).toHaveBeenCalledWith('refresh', {
        users: { 'socket-id': { name: 'name', observer: false, vote: '' } },
        voting: false,
      })
    })
  })
})
