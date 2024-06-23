import { getApp } from '../../../src/services/app.js'

vi.mock('axios')

describe('getApp', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({ json: vi.fn().mockResolvedValue('app') } as never)
  })

  it('should get app', async () => {
    await getApp()
    expect(fetch).toHaveBeenCalledWith('/api/app')
  })

  it('should return app', async () => {
    const result = await getApp()
    expect(result).toBe('app')
  })

  it('should null if error', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error())
    const result = await getApp()
    expect(result).toBeNull()
  })
})
