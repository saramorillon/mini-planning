import { getMockReq, getMockRes } from '@jest-mock/express'
import { renderFront } from '@src/controllers/renderFront'

describe('renderFront', () => {
  it('should send index.html', () => {
    const req = getMockReq()
    const { res } = getMockRes()
    renderFront(req, res)
    expect(res.sendFile).toHaveBeenCalledWith('public-dir/index.html')
  })
})
