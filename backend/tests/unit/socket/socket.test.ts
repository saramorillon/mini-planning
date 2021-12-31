import io from 'socket.io'
import { Namespace } from '../../../src/socket/namespace'
import { Socket } from '../../../src/socket/socket'
import { mockIoSocket, mockNamespace, mockUser } from '../../mocks'

describe('Socket', () => {
  describe('constructor', () => {
    it('should register socket events', () => {
      const socketMock = ({ on: jest.fn() } as unknown) as io.Socket
      const socket = new Socket({} as Namespace, socketMock)
      expect(socketMock.on).toHaveBeenCalledWith('join', socket['onJoin'])
      expect(socketMock.on).toHaveBeenCalledWith('vote', socket['onVote'])
      expect(socketMock.on).toHaveBeenCalledWith('voting', socket['onVoting'])
      expect(socketMock.on).toHaveBeenCalledWith('disconnect', socket['onDisconnect'])
    })
  })

  describe('onJoin', () => {
    it('should kick user', () => {
      const namespaceMock = mockNamespace()
      const socket = new Socket(namespaceMock, mockIoSocket({ on: jest.fn() }))
      socket['onJoin']({ name: 'name', observer: false })
      expect(namespaceMock.kickUser).toHaveBeenCalledWith('name')
    })

    it('should init client', () => {
      const namespaceMock = mockNamespace()
      const socket = new Socket(namespaceMock, mockIoSocket({ on: jest.fn() }))
      socket['onJoin']({ name: 'name', observer: false })
      expect(namespaceMock['clients']).toEqual({ id: mockUser() })
    })

    it('should refresh clients', () => {
      const namespaceMock = mockNamespace()
      const socket = new Socket(namespaceMock, mockIoSocket({ on: jest.fn() }))
      socket['onJoin']({ name: 'name', observer: false })
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', {
        voting: false,
        users: [mockUser()],
        votes: { '': 1, total: 1 },
      })
    })
  })

  describe('onVote', () => {
    it('should set client vote', () => {
      const namespaceMock = mockNamespace({ id: mockUser() })
      const socket = new Socket(namespaceMock, mockIoSocket({ on: jest.fn() }))
      socket['onVote'](mockUser({ vote: '5' }))
      expect(namespaceMock['clients']).toEqual({ id: mockUser({ vote: '5' }) })
    })

    it('should refresh clients', () => {
      const namespaceMock = mockNamespace({ id: mockUser() })
      const socket = new Socket(namespaceMock, mockIoSocket({ on: jest.fn() }))
      socket['onVote'](mockUser({ vote: '5' }))
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', {
        voting: false,
        users: [mockUser({ vote: '5' })],
        votes: { '5': 1, total: 1 },
      })
    })
  })

  describe('onVoting', () => {
    it('should set namespace voting state', () => {
      const namespaceMock = mockNamespace({ id: mockUser({ vote: '5' }) })
      const socket = new Socket(namespaceMock, mockIoSocket({ on: jest.fn() }))
      socket['onVoting'](true)
      expect(namespaceMock.voting).toBe(true)
    })

    it('should not reset clients votes if voting is false', () => {
      const namespaceMock = mockNamespace({ id: mockUser({ vote: '5' }) })
      const socket = new Socket(namespaceMock, mockIoSocket({ on: jest.fn() }))
      socket['onVoting'](false)
      expect(namespaceMock['clients']).toEqual({ id: mockUser({ vote: '5' }) })
    })

    it('should reset clients votes if voting is true', () => {
      const namespaceMock = mockNamespace({ id: mockUser({ vote: '5' }) })
      const socket = new Socket(namespaceMock, mockIoSocket({ on: jest.fn() }))
      socket['onVoting'](true)
      expect(namespaceMock['clients']).toEqual({ id: mockUser() })
    })

    it('should refresh clients if voting is false', () => {
      const namespaceMock = mockNamespace({ id: mockUser({ vote: '5' }) })
      const socket = new Socket(namespaceMock, mockIoSocket({ on: jest.fn() }))
      socket['onVoting'](false)
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', {
        voting: false,
        users: [mockUser({ vote: '5' })],
        votes: { '5': 1, total: 1 },
      })
    })

    it('should refresh clients if voting is true', () => {
      const namespaceMock = mockNamespace({ id: mockUser({ vote: '5' }) })
      const socket = new Socket(namespaceMock, mockIoSocket({ on: jest.fn() }))
      socket['onVoting'](true)
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', {
        voting: true,
        users: [mockUser()],
        votes: { '': 1, total: 1 },
      })
    })
  })

  describe('onDisconnect', () => {
    it('should remove socket from clients', () => {
      const namespaceMock = mockNamespace({ id: mockUser() })
      const socket = new Socket(namespaceMock, mockIoSocket({ on: jest.fn() }))
      socket['onDisconnect']()
      expect(namespaceMock['clients']).toEqual({})
    })

    it('should refresh clients', () => {
      const namespaceMock = mockNamespace({ id: mockUser() })
      const socket = new Socket(namespaceMock, mockIoSocket({ on: jest.fn() }))
      socket['onDisconnect']()
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', { voting: false, users: [], votes: { total: 0 } })
    })
  })

  describe('refresh', () => {
    it('should refresh clients', () => {
      const namespaceMock = mockNamespace({ id: mockUser() })
      const socket = new Socket(namespaceMock, mockIoSocket({ on: jest.fn() }))
      socket['refresh']()
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', {
        voting: false,
        users: [mockUser()],
        votes: { '': 1, total: 1 },
      })
    })
  })
})
