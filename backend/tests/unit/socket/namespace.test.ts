import { Socket as IoSocket } from 'socket.io/dist/socket'
import { Namespace } from '../../../src/socket/namespace'
import { Socket } from '../../../src/socket/socket'
import { mockIoNamespace, mockIoSocket, mockUser } from '../../mocks'

jest.mock('../../../src/socket/socket')

describe('Namespace', () => {
  describe('constructor', () => {
    it('should create new socket', () => {
      const mockSocket = mockIoSocket()
      const mockNamespace = mockIoNamespace()
      const namespace = new Namespace(mockNamespace)
      mockNamespace.emit('connection', mockSocket)
      expect(Socket).toHaveBeenCalledWith(namespace, mockSocket)
    })
  })

  describe('kickUser', () => {
    it('should disconnect socket if user already exists', () => {
      const mockSocket = mockIoSocket()
      const mockNamespace = mockIoNamespace([['socketId', mockSocket]])
      const namespace = new Namespace(mockNamespace)
      namespace['clients'] = { socketId: mockUser() }
      namespace.kickUser('name')
      expect(mockSocket.disconnect).toHaveBeenCalled()
    })

    it('should not disconnect socket if socket does not exist', () => {
      jest.spyOn(IoSocket.prototype, 'disconnect')
      const mockNamespace = mockIoNamespace()
      const namespace = new Namespace(mockNamespace)
      namespace['clients'] = { socketId: mockUser() }
      namespace.kickUser('name')
      expect(IoSocket.prototype.disconnect).not.toHaveBeenCalled()
    })

    it('should not disconnect socket if user does not already exist', () => {
      const mockSocket = mockIoSocket()
      const mockNamespace = mockIoNamespace([['socketId', mockSocket]])
      const namespace = new Namespace(mockNamespace)
      namespace.kickUser('name')
      expect(mockSocket.disconnect).not.toHaveBeenCalled()
    })
  })

  describe('getClients', () => {
    it('should return clients', () => {
      const mockNamespace = mockIoNamespace()
      const namespace = new Namespace(mockNamespace)
      namespace['clients'] = { socketId: mockUser() }
      const clients = namespace.getClients()
      expect(clients).toEqual({ socketId: mockUser() })
    })
  })

  describe('getClient', () => {
    it('should return client', () => {
      const mockNamespace = mockIoNamespace()
      const namespace = new Namespace(mockNamespace)
      namespace['clients'] = { socketId: mockUser() }
      const clients = namespace.getClient('socketId')
      expect(clients).toEqual(mockUser())
    })
  })

  describe('setClient', () => {
    it('should set client', () => {
      const mockNamespace = mockIoNamespace()
      const namespace = new Namespace(mockNamespace)
      namespace.setClient('socketId', mockUser())
      expect(namespace['clients']).toEqual({ socketId: mockUser() })
    })
  })

  describe('deleteClient', () => {
    it('should return client', () => {
      const mockNamespace = mockIoNamespace()
      const namespace = new Namespace(mockNamespace)
      namespace['clients'] = { socketId: mockUser() }
      namespace.deleteClient('socketId')
      expect(namespace['clients']).toEqual({})
    })
  })
})
