import http from 'http'
import io from 'socket.io'
import { IoService } from '../../../src/socket/io'
import { Room } from '../../../src/socket/room'
import { mock } from '../../mocks'

jest.mock('socket.io')
jest.mock('../../../src/socket/room')

describe('IoService', () => {
  describe('init', () => {
    it('should create new io server', () => {
      const httpServer = {} as http.Server
      IoService.init(httpServer)
      expect(io.Server).toHaveBeenCalledWith(httpServer, { transports: ['polling'] })
    })
  })

  describe('initRoom', () => {
    it('should init namespace if it does not exist', () => {
      mock(io.Server).mockReturnValue({ _nsps: { has: jest.fn().mockReturnValue(false) } })
      IoService.init({} as http.Server)
      IoService.initRoom('name')
      expect(Room).toHaveBeenCalledWith('name')
    })

    it('should not init namespace if it already exists', () => {
      mock(io.Server).mockReturnValue({ _nsps: { has: jest.fn().mockReturnValue(true) } })
      IoService.init({} as http.Server)
      IoService.initRoom('name')
      expect(Room).not.toHaveBeenCalled()
    })
  })

  describe('createNamespace', () => {
    it('should create namespace', () => {
      mock(io.Server).mockReturnValue({ of: jest.fn() })
      IoService.init({} as http.Server)
      IoService.createNamespace('name')
      expect(IoService.io.of).toHaveBeenCalledWith('name')
    })

    it('should return namespace', () => {
      mock(io.Server).mockReturnValue({ of: jest.fn() })
      IoService.init({} as http.Server)
      IoService.createNamespace('name')
      expect(IoService.io.of).toHaveBeenCalledWith('name')
    })
  })
})
