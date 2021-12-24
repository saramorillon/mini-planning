import axios from 'axios'
import { getApp } from '../../../src/services/app'
import { mock } from '../../mocks'

jest.mock('axios')

describe('getApp', () => {
  it('should get app', async () => {
    mock(axios.get).mockResolvedValue({ data: 'app' })
    await getApp()
    expect(axios.get).toHaveBeenCalledWith('/api/app')
  })

  it('should return app', async () => {
    mock(axios.get).mockResolvedValue({ data: 'app' })
    const result = await getApp()
    expect(result).toBe('app')
  })

  it('should null if error', async () => {
    mock(axios.get).mockRejectedValue(new Error())
    const result = await getApp()
    expect(result).toBeNull()
  })
})
