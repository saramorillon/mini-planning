import { getMockReq, getMockRes } from '@jest-mock/express'
import { getVersion } from '@src/controllers/getVersion'

jest.mock('../../../package.json', () => ({ version: '1.0.0' }))

describe('getVersion', () => {
  it('should return package.json version', () => {
    const req = getMockReq()
    const { res } = getMockRes()
    getVersion(req, res)
    expect(res.send).toHaveBeenCalledWith('1.0.0')
  })
})
