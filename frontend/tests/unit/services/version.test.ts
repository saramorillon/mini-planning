import { getVersion } from '@src/services/version'
import axios from 'axios'

jest.mock('axios')

const getMock = axios.get as jest.Mock

describe('getVersion', () => {
  beforeEach(() => {
    getMock.mockResolvedValue({ status: 200, statusText: 'OK', data: '1.0.0' })
  })

  it('should fetch version', async () => {
    await getVersion()
    expect(axios.get).toHaveBeenCalledWith('/version')
  })

  it('should return version', async () => {
    const result = await getVersion()
    expect(result).toBe('1.0.0')
  })

  it('should reject if status is greater or equal than 400', async () => {
    getMock.mockResolvedValue({ status: 400, statusText: 'Bad Request' })
    await expect(getVersion()).rejects.toThrow(new Error('Bad Request'))
  })
})
