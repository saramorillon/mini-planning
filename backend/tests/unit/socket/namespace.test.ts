import io from 'socket.io'
import { EventEmitter } from 'events'
import { Namespace } from '@src/socket/namespace'
import { Socket } from '@src/socket/socket'

jest.mock('@src/socket/socket')

describe('Namespace', () => {
  describe('constructor', () => {
    it('should create new socket', () => {
      const mockSocket = ({ on: jest.fn() } as unknown) as io.Socket
      const mockNamespace = new EventEmitter() as io.Namespace
      const namespace = new Namespace(mockNamespace)
      mockNamespace.emit('connection', mockSocket)
      expect(Socket).toHaveBeenCalledWith(namespace, mockSocket)
    })
  })
})
