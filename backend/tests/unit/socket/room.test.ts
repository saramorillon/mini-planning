import { logger } from '../../../src/libs/logger'
import { IoService } from '../../../src/socket/io'
import { Room } from '../../../src/socket/room'
import { mockNamespace, mockSocket, mockUser } from '../../mocks'

jest.mock('../../../src/socket/io')
jest.mock('../../../src/libs/logger')

describe('Room', () => {
  beforeEach(() => {
    jest.spyOn(IoService, 'createNamespace').mockReturnValue(mockNamespace())
  })

  describe('constructor', () => {
    it('should create namespace', () => {
      const namespace = mockNamespace()
      jest.spyOn(IoService, 'createNamespace').mockReturnValue(namespace)
      const room = new Room('/test')
      expect(IoService.createNamespace).toHaveBeenCalledWith('/test')
      expect(room['namespace']).toBe(namespace)
    })

    it('should listen to connection event', () => {
      const namespace = mockNamespace()
      jest.spyOn(IoService, 'createNamespace').mockReturnValue(namespace)
      new Room('/test')
      expect(namespace.on).toHaveBeenCalledWith('connection', expect.any(Function))
    })

    it('should register socket events', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['namespace'].emit('connection', socket)
      expect(socket.on).toHaveBeenCalledWith('join', expect.any(Function))
      expect(socket.on).toHaveBeenCalledWith('vote', expect.any(Function))
      expect(socket.on).toHaveBeenCalledWith('voting', expect.any(Function))
      expect(socket.on).toHaveBeenCalledWith('disconnect', expect.any(Function))
    })

    it('should join user on join event', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['onJoin'] = jest.fn()
      room['namespace'].emit('connection', socket)
      socket.emit('join', mockUser())
      expect(room['onJoin']).toHaveBeenCalledWith(socket, mockUser())
    })

    it('should vote on vote event', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['onVote'] = jest.fn()
      room['namespace'].emit('connection', socket)
      socket.emit('vote', 'vote')
      expect(room['onVote']).toHaveBeenCalledWith(socket, 'vote')
    })

    it('should disconnect user on disconnect event', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['onDisconnect'] = jest.fn()
      room['namespace'].emit('connection', socket)
      socket.emit('disconnect')
      expect(room['onDisconnect']).toHaveBeenCalledWith(socket)
    })

    it('should change status on voting event', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['onVoting'] = jest.fn()
      room['namespace'].emit('connection', socket)
      socket.emit('voting', false)
      expect(room['onVoting']).toHaveBeenCalledWith(false)
    })
  })

  describe('onJoin', () => {
    it('should do nothing if socket already joined', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['users'] = { [socket.id]: mockUser() }
      room['onJoin'](socket, mockUser())
      expect(logger.info).not.toHaveBeenCalled()
    })

    it('should add user to room users', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['onJoin'](socket, mockUser())
      expect(room['users']).toEqual({ [socket.id]: mockUser() })
    })

    it('should log when adding user', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['onJoin'](socket, mockUser())
      expect(logger.info).toHaveBeenCalledWith('user_join', { room: '/test', user: mockUser() })
    })

    it('should refresh after adding user', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['refresh'] = jest.fn()
      room['onJoin'](socket, mockUser())
      expect(room['refresh']).toHaveBeenCalled()
    })
  })

  describe('onVote', () => {
    it('should do nothing if socket did not join', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['onVote'](socket, '5')
      expect(logger.info).not.toHaveBeenCalled()
    })

    it('should change user vote', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['users'] = { [socket.id]: mockUser() }
      room['onVote'](socket, '5')
      expect(room['users']).toEqual({ [socket.id]: mockUser({ vote: '5' }) })
    })

    it('should log when voting', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['users'] = { [socket.id]: mockUser() }
      room['onVote'](socket, '5')
      expect(logger.info).toHaveBeenCalledWith('user_vote', { room: '/test', user: mockUser({ vote: '5' }) })
    })

    it('should refresh after voting', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['users'] = { [socket.id]: mockUser() }
      room['refresh'] = jest.fn()
      room['onVote'](socket, '5')
      expect(room['refresh']).toHaveBeenCalled()
    })
  })

  describe('onDisconnect', () => {
    it('should do nothing if socket did not join', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['onDisconnect'](socket)
      expect(logger.info).not.toHaveBeenCalled()
    })

    it('should log when disconnecting user', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['users'] = { [socket.id]: mockUser() }
      room['onDisconnect'](socket)
      expect(logger.info).toHaveBeenCalledWith('user_disconnect', { room: '/test', user: mockUser() })
    })

    it('should disconnect user', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['users'] = { [socket.id]: mockUser() }
      room['onDisconnect'](socket)
      expect(room['users']).toEqual({})
    })

    it('should refresh after disconnecting user', () => {
      const socket = mockSocket()
      const room = new Room('/test')
      room['users'] = { [socket.id]: mockUser() }
      room['refresh'] = jest.fn()
      room['onDisconnect'](socket)
      expect(room['refresh']).toHaveBeenCalled()
    })
  })

  describe('onVoting', () => {
    it('should set voting state', () => {
      const room = new Room('/test')
      room['onVoting'](false)
      expect(room['voting']).toBe(false)
    })

    it('should not reset users votes if voting is false', () => {
      const room = new Room('/test')
      room['users'] = { id: mockUser({ vote: '5' }) }
      room['onVoting'](false)
      expect(room['users']).toEqual({ id: mockUser({ vote: '5' }) })
    })

    it('should reset users votes if voting is true', () => {
      const room = new Room('/test')
      room['users'] = { id: mockUser({ vote: '5' }) }
      room['onVoting'](true)
      expect(room['users']).toEqual({ id: mockUser({ vote: '' }) })
    })

    it('should refresh after changing state', () => {
      const room = new Room('/test')
      room['refresh'] = jest.fn()
      room['onVoting'](false)
      expect(room['refresh']).toHaveBeenCalled()
    })
  })

  describe('refresh', () => {
    it('should emit refresh event', () => {
      const room = new Room('/test')
      room['users'] = { id: mockUser() }
      room['refresh']()
      expect(room['namespace'].emit).toHaveBeenCalledWith('refresh', { voting: true, users: { id: mockUser() } })
    })
  })
})
