import { getVotes } from '../../../src/utils/getVotes.js'
import { mockUser } from '../../mocks.js'

describe('getVotes', () => {
  it('should return total number of votes for each value', () => {
    const result = getVotes([
      mockUser({ vote: '1' }),
      mockUser({ vote: '1' }),
      mockUser({ vote: '5' }),
      mockUser({ vote: '3' }),
      mockUser({ vote: '3' }),
      mockUser({ vote: '3' }),
      mockUser({ vote: '0' }),
      mockUser({ observer: true }),
    ])
    expect(result).toEqual({ total: 7, '0': 1, '1': 2, '3': 3, '5': 1 })
  })
})
