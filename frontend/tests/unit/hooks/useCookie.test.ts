import { useCookie } from '@src/hooks/useCookie'
import { fireEvent } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'

describe('useCookie', () => {
  it('should change value on cookie change', () => {
    const { result } = renderHook(() => useCookie('cookiename'))
    expect(result.current).toBeUndefined()
    act(() => {
      fireEvent(document, new CustomEvent('cookiechange', { detail: { cookiename: 'value' } }))
    })
    expect(result.current).toBe('value')
  })

  it('should not change value when another cookie changes', () => {
    const { result } = renderHook(() => useCookie('cookiename'))
    expect(result.current).toBeUndefined()
    act(() => {
      fireEvent(document, new CustomEvent('cookiechange', { detail: { anothercookie: 'value' } }))
    })
    expect(result.current).toBeUndefined()
  })
})
