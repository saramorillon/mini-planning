import http from 'http'
import io from 'socket.io'
import { IoService } from '../../../src/socket/io'
import { Namespace } from '../../../src/socket/namespace'
import { mockIo } from '../../mocks'

jest.mock('socket.io')
jest.mock('../../../src/socket/namespace')

const ioServerMock = (io.Server as unknown) as jest.Mock

describe('IoService', () => {
  describe('init', () => {
    it('should create new io server', () => {
      const httpServer = {} as http.Server
      IoService.init(httpServer)
      expect(ioServerMock).toHaveBeenCalledWith(httpServer, { transports: ['polling'] })
    })
  })

  describe('initNamespace', () => {
    it('should init namespace if it does not exist', () => {
      ioServerMock.mockReturnValue(mockIo('namespace'))
      IoService.init({} as http.Server)
      IoService.initNamespace('name')
      expect(Namespace).toHaveBeenCalledWith('namespace')
    })

    it('should not init namespace if it already exists', () => {
      ioServerMock.mockReturnValue(mockIo())
      IoService.init({} as http.Server)
      IoService.initNamespace('name')
      expect(Namespace).not.toHaveBeenCalled()
    })
  })
})
