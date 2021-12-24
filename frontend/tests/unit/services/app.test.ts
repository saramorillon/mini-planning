import axios from 'axios'
import { getApp } from '../../../src/services/app'
import { mock } from '../../mocks'

jest.mock('axios')

describe('getApp', () => {
  it('should get app', async () => {
    mock(axios.get).mockResolvedValue('app')
    await getApp()
    expect(axios.get).toHaveBeenCalledWith({ url: '/api/app' }, null)
  })

  it('should return app', async () => {
    mock(axios.get).mockResolvedValue('app')
    const result = await getApp()
    expect(result).toBe('app')
  })
})
