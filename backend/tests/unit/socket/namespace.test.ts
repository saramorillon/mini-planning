import { Namespace } from '@src/socket/namespace'
import { Socket } from '@src/socket/socket'
import { mockIoNamespace, mockIoSocket, mockUser } from '@tests/fixture'

jest.mock('@src/socket/socket')

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

  describe('disconnectSocket', () => {
    it('should disconnect socket', () => {
      const mockSocket = mockIoSocket()
      const mockNamespace = mockIoNamespace()
      mockNamespace.sockets.set('socketId', mockSocket)
      const namespace = new Namespace(mockNamespace)
      namespace.disconnectSocket('socketId')
      expect(mockSocket.disconnect).toHaveBeenCalled()
    })
  })

  describe('findClient', () => {
    it('should return client', () => {
      const mockNamespace = mockIoNamespace()
      const namespace = new Namespace(mockNamespace)
      namespace.clients = { socketId: mockUser() }
      const clientId = namespace.findClient('name')
      expect(clientId).toBe('socketId')
    })
  })
})
