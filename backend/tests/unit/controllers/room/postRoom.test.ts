import { getMockReq, getMockRes } from '@jest-mock/express'
import { randomBytes } from 'crypto'
import { postRoom } from '../../../../src/controllers/room/postRoom'
import { IoService } from '../../../../src/socket/io'
import { mock } from '../../../mocks'

jest.mock('crypto')
jest.mock('../../../../src/socket/io')

describe('postRoom', () => {
  beforeEach(() => {
    mock(randomBytes).mockReturnValue('namespace')
  })

  it('should init namespace', () => {
    const req = getMockReq()
    const { res } = getMockRes()
    postRoom(req, res)
    expect(IoService.initRoom).toHaveBeenCalledWith('/namespace')
  })

  it('should send namespace id', () => {
    const req = getMockReq()
    const { res } = getMockRes()
    postRoom(req, res)
    expect(res.send).toHaveBeenCalledWith('namespace')
  })

  it('should send 500 status when failure', () => {
    mock(IoService.initRoom).mockImplementation(() => {
      throw new Error()
    })
    const req = getMockReq()
    const { res } = getMockRes()
    postRoom(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
