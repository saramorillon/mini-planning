import { getMockReq, getMockRes } from '@jest-mock/express'
import { postRoom } from '../../../../src/controllers/room/postRoom'
import { IoService } from '../../../../src/socket/io'
import { mock } from '../../../mocks'

jest.mock('../../../../src/socket/io')

describe('portRoom', () => {
  it('should init namespace', () => {
    const req = getMockReq({ params: { id: 'namespace' } })
    const { res } = getMockRes()
    postRoom(req, res)
    expect(IoService.initNamespace).toHaveBeenCalledWith('/namespace')
  })

  it('should send 204 status', () => {
    const req = getMockReq({ params: { id: 'namespace' } })
    const { res } = getMockRes()
    postRoom(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(204)
  })

  it('should send 500 status when failure', () => {
    mock(IoService.initNamespace).mockImplementation(() => {
      throw new Error()
    })
    const req = getMockReq({ params: { id: 'namespace' } })
    const { res } = getMockRes()
    postRoom(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
