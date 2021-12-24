import { getMockReq, getMockRes } from '@jest-mock/express'
import { postRoom } from '@src/controllers/room/postRoom'
import { IoService } from '@src/socket/io'

jest.mock('@src/socket/io')

describe('portRoom', () => {
  it('should init namespace', () => {
    const req = getMockReq({ params: { id: 'namespace' } })
    const { res } = getMockRes()
    postRoom(req, res)
    expect(IoService.initNamespace).toHaveBeenCalledWith('/namespace')
  })

  it('should return 204', () => {
    const req = getMockReq({ params: { id: 'namespace' } })
    const { res } = getMockRes()
    postRoom(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(204)
  })
})
