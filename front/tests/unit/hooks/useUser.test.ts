import { renderHook } from '@testing-library/react'
import { useLocation } from 'react-router-dom'
import { useUser } from '../../../src/hooks/useUser.js'
import { mock } from '../../mocks.js'

vi.mock('react-router-dom')

describe('useUser', () => {
  beforeEach(() => {
    mock(useLocation).mockReturnValue({})
  })

  it('should return undefined by default', () => {
    const { result } = renderHook(() => useUser())
    expect(result.current).toBeUndefined()
  })

  it('should return undefined is user name is not in query params', () => {
    mock(useLocation).mockReturnValue({ search: 'titi=toto' })
    const { result } = renderHook(() => useUser())
    expect(result.current).toBeUndefined()
  })

  it('should return user name if name is in query params', () => {
    mock(useLocation).mockReturnValue({ search: 'name=toto' })
    const { result } = renderHook(() => useUser())
    expect(result.current).toEqual({ name: 'toto', observer: false })
  })
})
