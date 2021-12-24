import io from 'socket.io'
import { Namespace } from '../../../src/socket/namespace'
import { Socket } from '../../../src/socket/socket'
import { mockIoSocket, mockNamespace, mockUser } from '../../mocks'

describe('Socket', () => {
  describe('constructor', () => {
    it('should register socket events', () => {
      const socketMock = ({ on: jest.fn() } as unknown) as io.Socket
      const socket = new Socket({} as Namespace, socketMock)
      expect(socketMock.on).toHaveBeenCalledWith('join', socket.onJoin)
      expect(socketMock.on).toHaveBeenCalledWith('vote', socket.onVote)
      expect(socketMock.on).toHaveBeenCalledWith('voting', socket.onVoting)
      expect(socketMock.on).toHaveBeenCalledWith('disconnect', socket.onDisconnect)
    })
  })

  describe('onJoin', () => {
    let socketMock: io.Socket
    let namespaceMock: Namespace

    beforeEach(() => {
      socketMock = mockIoSocket({ on: jest.fn() })
      namespaceMock = mockNamespace()
    })

    it('should disconnect client if client is already connected', () => {
      const socket = new Socket(namespaceMock, socketMock)
      namespaceMock.findClient = jest.fn().mockReturnValue('existing')
      socket.onJoin({ name: 'name', observer: false })
      expect(namespaceMock.disconnectSocket).toHaveBeenCalledWith('existing')
    })

    it('should init client', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onJoin({ name: 'name', observer: false })
      expect(namespaceMock.clients).toEqual({ id: mockUser() })
    })

    it('should refresh clients', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onJoin({ name: 'name', observer: false })
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', {
        voting: false,
        users: [mockUser()],
        votes: { '': 1, total: 1 },
      })
    })
  })

  describe('onVote', () => {
    let socketMock: io.Socket
    let namespaceMock: Namespace

    beforeEach(() => {
      socketMock = mockIoSocket({ on: jest.fn() })
      namespaceMock = mockNamespace({ clients: { id: mockUser() } })
    })

    it('should set client vote', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onVote(mockUser({ vote: '5' }))
      expect(namespaceMock.clients).toEqual({ id: mockUser({ vote: '5' }) })
    })

    it('should refresh clients', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onVote(mockUser({ vote: '5' }))
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', {
        voting: false,
        users: [mockUser({ vote: '5' })],
        votes: { '5': 1, total: 1 },
      })
    })
  })

  describe('onVoting', () => {
    let socketMock: io.Socket
    let namespaceMock: Namespace

    beforeEach(() => {
      socketMock = mockIoSocket({ on: jest.fn() })
      namespaceMock = mockNamespace({ clients: { id: mockUser({ vote: '5' }) } })
    })

    it('should set namespace voting state', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onVoting(true)
      expect(namespaceMock.voting).toBe(true)
    })

    it('should not reset clients votes if voting is false', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onVoting(false)
      expect(namespaceMock.clients).toEqual({ id: mockUser({ vote: '5' }) })
    })

    it('should reset clients votes if voting is true', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onVoting(true)
      expect(namespaceMock.clients).toEqual({ id: mockUser() })
    })

    it('should refresh clients if voting is false', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onVoting(false)
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', {
        voting: false,
        users: [mockUser({ vote: '5' })],
        votes: { '5': 1, total: 1 },
      })
    })

    it('should refresh clients if voting is true', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onVoting(true)
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', {
        voting: true,
        users: [mockUser()],
        votes: { '': 1, total: 1 },
      })
    })
  })

  describe('onDisconnect', () => {
    let socketMock: io.Socket
    let namespaceMock: Namespace

    beforeEach(() => {
      socketMock = mockIoSocket({ on: jest.fn() })
      namespaceMock = mockNamespace({ clients: { id: mockUser() } })
    })

    it('should remove socket from clients', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onDisconnect()
      expect(namespaceMock.clients).toEqual({})
    })

    it('should refresh clients', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onDisconnect()
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', { voting: false, users: [], votes: { total: 0 } })
    })
  })

  describe('vote', () => {
    it('should set user for client socket', () => {
      const socketMock = mockIoSocket({ on: jest.fn() })
      const namespaceMock = mockNamespace({ clients: { id: mockUser() } })
      const socket = new Socket(namespaceMock, socketMock)
      socket.vote('id', mockUser({ vote: '8' }))
      expect(namespaceMock.clients).toEqual({ id: mockUser({ vote: '8' }) })
    })
  })

  describe('refresh', () => {
    it('should refresh clients', () => {
      const socketMock = mockIoSocket({ on: jest.fn() })
      const namespaceMock = mockNamespace({ clients: { id: mockUser() } })
      const socket = new Socket(namespaceMock, socketMock)
      socket.refresh()
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', {
        voting: false,
        users: [mockUser()],
        votes: { '': 1, total: 1 },
      })
    })
  })
})
