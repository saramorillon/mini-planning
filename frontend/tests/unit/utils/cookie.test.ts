import { registerCookieEvent } from '@src/utils/cookie'

registerCookieEvent()

describe('cookie', () => {
  let spy: jest.SpyInstance

  beforeEach(() => {
    document.cookie = 'prop=value1'
    spy = jest.spyOn(document, 'dispatchEvent')
  })

  afterEach(() => {
    spy.mockRestore()
  })

  it('should dispatch cookiechange event when a cookie is set', () => {
    document.cookie = 'prop=value2'
    expect(document.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('cookiechange', { detail: { prop: 'value2' } }))
  })

  it('should not dispatch cookiechange event if a cookie is set with the same value', () => {
    document.cookie = 'prop=value1'
    expect(document.dispatchEvent).not.toHaveBeenCalled()
  })
})
