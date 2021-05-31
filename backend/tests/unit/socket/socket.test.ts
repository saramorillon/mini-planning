import io from 'socket.io'
import { Namespace } from '@src/socket/namespace'
import { Socket } from '@src/socket/socket'
import { mockNamespace, mockSocket } from '@tests/fixture'

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
      socketMock = mockSocket({ on: jest.fn() })
      namespaceMock = mockNamespace()
    })

    it('should init client', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onJoin('name')
      expect(namespaceMock.clients).toEqual({ id: { name: 'name' } })
    })

    it('should refresh clients', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onJoin('name')
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', { users: [{ name: 'name' }], voting: false })
    })
  })

  describe('onVote', () => {
    let socketMock: io.Socket
    let namespaceMock: Namespace

    beforeEach(() => {
      socketMock = mockSocket({ on: jest.fn() })
      namespaceMock = mockNamespace({ clients: { id: { name: 'name' } } })
    })

    it('should set client vote', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onVote('5')
      expect(namespaceMock.clients).toEqual({ id: { name: 'name', vote: '5' } })
    })

    it('should refresh clients', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onVote('5')
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', {
        users: [{ name: 'name', vote: '5' }],
        voting: false,
      })
    })
  })

  describe('onVoting', () => {
    let socketMock: io.Socket
    let namespaceMock: Namespace

    beforeEach(() => {
      socketMock = mockSocket({ on: jest.fn() })
      namespaceMock = mockNamespace({ clients: { id: { name: 'name', vote: '5' } } })
    })

    it('should set namespace voting state', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onVoting(true)
      expect(namespaceMock.voting).toBe(true)
    })

    it('should not reset clients votes if voting is false', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onVoting(false)
      expect(namespaceMock.clients).toEqual({ id: { name: 'name', vote: '5' } })
    })

    it('should reset clients votes if voting is true', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onVoting(true)
      expect(namespaceMock.clients).toEqual({ id: { name: 'name' } })
    })

    it('should refresh clients if voting is false', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onVoting(false)
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', {
        users: [{ name: 'name', vote: '5' }],
        voting: false,
      })
    })

    it('should refresh clients if voting is true', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onVoting(true)
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', {
        users: [{ name: 'name' }],
        voting: true,
      })
    })
  })

  describe('onDisconnect', () => {
    let socketMock: io.Socket
    let namespaceMock: Namespace

    beforeEach(() => {
      socketMock = mockSocket({ on: jest.fn() })
      namespaceMock = mockNamespace({ clients: { id: { name: 'name' } } })
    })

    it('should remove socket from clients', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onDisconnect()
      expect(namespaceMock.clients).toEqual({})
    })

    it('should refresh clients', () => {
      const socket = new Socket(namespaceMock, socketMock)
      socket.onDisconnect()
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', { users: [], voting: false })
    })
  })

  describe('vote', () => {
    it('should set client name to unknown when no socket', () => {
      const socketMock = mockSocket({ on: jest.fn() })
      const namespaceMock = ({ clients: {}, emit: jest.fn() } as unknown) as Namespace
      const socket = new Socket(namespaceMock, socketMock)
      socket.vote('id', 'vote')
      expect(namespaceMock.clients).toEqual({ id: { name: 'Unknown', vote: 'vote' } })
    })

    it('should set vote for client socket', () => {
      const socketMock = mockSocket({ on: jest.fn() })
      const namespaceMock = mockNamespace({ clients: { id: { name: 'name' } } })
      const socket = new Socket(namespaceMock, socketMock)
      socket.vote('id', 'vote')
      expect(namespaceMock.clients).toEqual({ id: { name: 'name', vote: 'vote' } })
    })
  })

  describe('refresh', () => {
    it('should refresh clients', () => {
      const socketMock = mockSocket({ on: jest.fn() })
      const namespaceMock = mockNamespace({ clients: { id: { name: 'name' } } })
      const socket = new Socket(namespaceMock, socketMock)
      socket.refresh()
      expect(namespaceMock.emit).toHaveBeenCalledWith('refresh', { users: [{ name: 'name' }], voting: false })
    })
  })
})
