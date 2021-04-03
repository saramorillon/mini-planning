import io from 'socket.io'
import { Namespace } from '@src/socket/namespace'
import { Socket } from '@src/socket/socket'

describe('Socket', () => {
  describe('constructor', () => {
    it('should register socket events', () => {
      const mockSocket = ({ on: jest.fn() } as unknown) as io.Socket
      const socket = new Socket({} as Namespace, mockSocket)
      expect(mockSocket.on).toHaveBeenCalledWith('join', socket.onJoin)
      expect(mockSocket.on).toHaveBeenCalledWith('vote', socket.onVote)
      expect(mockSocket.on).toHaveBeenCalledWith('voting', socket.onVoting)
      expect(mockSocket.on).toHaveBeenCalledWith('disconnect', socket.onDisconnect)
    })
  })

  describe('onJoin', () => {
    let mockSocket: io.Socket
    let mockNamespace: Namespace

    beforeEach(() => {
      mockSocket = ({ id: 'id', on: jest.fn() } as unknown) as io.Socket
      mockNamespace = ({ clients: {}, emit: jest.fn() } as unknown) as Namespace
    })

    it('should init client', () => {
      const socket = new Socket(mockNamespace, mockSocket)
      socket.onJoin('name')
      expect(mockNamespace.clients).toEqual({ id: ['name', ''] })
    })

    it('should refresh clients', () => {
      const socket = new Socket(mockNamespace, mockSocket)
      socket.onJoin('name')
      expect(mockNamespace.emit).toHaveBeenCalledWith('refresh', [['name', '']])
    })
  })

  describe('onVote', () => {
    let mockSocket: io.Socket
    let mockNamespace: Namespace

    beforeEach(() => {
      mockSocket = ({ id: 'id', on: jest.fn() } as unknown) as io.Socket
      mockNamespace = ({ clients: { id: ['name', ''] }, emit: jest.fn() } as unknown) as Namespace
    })

    it('should set client vote', () => {
      const socket = new Socket(mockNamespace, mockSocket)
      socket.onVote('5')
      expect(mockNamespace.clients).toEqual({ id: ['name', '5'] })
    })

    it('should refresh clients', () => {
      const socket = new Socket(mockNamespace, mockSocket)
      socket.onVote('5')
      expect(mockNamespace.emit).toHaveBeenCalledWith('refresh', [['name', '5']])
    })
  })

  describe('onVoting', () => {
    let mockSocket: io.Socket
    let mockNamespace: Namespace

    beforeEach(() => {
      mockSocket = ({ id: 'id', on: jest.fn() } as unknown) as io.Socket
      mockNamespace = ({ clients: { id: ['name', '5'] }, emit: jest.fn() } as unknown) as Namespace
    })

    it('should emit voting event', () => {
      const socket = new Socket(mockNamespace, mockSocket)
      socket.onVoting(true)
      expect(mockNamespace.emit).toHaveBeenCalledWith('voting', true)
    })

    it('should not reset clients votes if voting is false', () => {
      const socket = new Socket(mockNamespace, mockSocket)
      socket.onVoting(false)
      expect(mockNamespace.clients).toEqual({ id: ['name', '5'] })
    })

    it('should not refresh clients if voting is false', () => {
      const socket = new Socket(mockNamespace, mockSocket)
      socket.onVoting(false)
      expect(mockNamespace.emit).not.toHaveBeenCalledWith('refresh')
    })

    it('should reset clients votes if voting is true', () => {
      const socket = new Socket(mockNamespace, mockSocket)
      socket.onVoting(true)
      expect(mockNamespace.clients).toEqual({ id: ['name', ''] })
    })

    it('should refresh clients if voting is true', () => {
      const socket = new Socket(mockNamespace, mockSocket)
      socket.onVoting(true)
      expect(mockNamespace.emit).toHaveBeenCalledWith('refresh', [['name', '']])
    })
  })

  describe('onDisconnect', () => {
    let mockSocket: io.Socket
    let mockNamespace: Namespace

    beforeEach(() => {
      mockSocket = ({ id: 'id', on: jest.fn() } as unknown) as io.Socket
      mockNamespace = ({ clients: { id: ['name', ''] }, emit: jest.fn() } as unknown) as Namespace
    })

    it('should remove socket from clients', () => {
      const socket = new Socket(mockNamespace, mockSocket)
      socket.onDisconnect()
      expect(mockNamespace.clients).toEqual({})
    })

    it('should refresh clients', () => {
      const socket = new Socket(mockNamespace, mockSocket)
      socket.onDisconnect()
      expect(mockNamespace.emit).toHaveBeenCalledWith('refresh', [])
    })
  })

  describe('refresh', () => {
    it('should refresh clients', () => {
      const mockSocket = ({ id: 'id', on: jest.fn() } as unknown) as io.Socket
      const mockNamespace = ({ clients: { id: ['name', ''] }, emit: jest.fn() } as unknown) as Namespace
      const socket = new Socket(mockNamespace, mockSocket)
      socket.refresh()
      expect(mockNamespace.emit).toHaveBeenCalledWith('refresh', [['name', '']])
    })
  })
})
