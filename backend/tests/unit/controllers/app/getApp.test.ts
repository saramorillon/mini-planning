import { getMockReq, getMockRes } from '@jest-mock/express'
import { getApp } from '../../../../src/controllers/app/getApp'

jest.mock('../../../../package.json', () => ({
  name: 'name',
  version: 'version',
  repository: 'repository',
  author: 'author',
}))

describe('getApp', () => {
  it('should return app name, version, repository and author', () => {
    const req = getMockReq()
    const { res } = getMockRes()
    getApp(req, res)
    expect(res.json).toHaveBeenCalledWith({
      name: 'name',
      version: 'version',
      repository: 'repository',
      author: 'author',
    })
  })

  it('should send 500 status when failure', () => {
    const req = getMockReq()
    const { res } = getMockRes()
    res.json = jest.fn().mockImplementation(() => {
      throw new Error()
    })
    getApp(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
