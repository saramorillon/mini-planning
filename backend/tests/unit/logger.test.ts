import mockdate from 'mockdate'
import { parseError, start } from '../../src/logger.js'

mockdate.set('2022-01-01T00:00:00.000Z')

describe('start', () => {
  it('should log message and meta', () => {
    start('message', { prop: 'value' })
    expect(console.info).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'info',
        timestamp: '2022-01-01T00:00:00.000Z',
        message: 'message',
        prop: 'value',
      }),
    )
  })

  it('should return log functions', () => {
    const fn = start('message', { prop: 'value' })
    expect(fn.success).toBeInstanceOf(Function)
    expect(fn.failure).toBeInstanceOf(Function)
  })

  it('should log message with "_success"', () => {
    const { success } = start('message', { prop: 'value' })
    success()
    expect(console.info).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'info',
        timestamp: '2022-01-01T00:00:00.000Z',
        message: 'message_success',
        prop: 'value',
      }),
    )
  })

  it('should log message with "_failure" and error', () => {
    const { failure } = start('message', { prop: 'value' })
    const error = new Error('error')
    failure(error)
    expect(console.error).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'error',
        timestamp: '2022-01-01T00:00:00.000Z',
        message: 'message_failure',
        prop: 'value',
        error: { message: error.message, stack: error.stack },
      }),
    )
  })
})

describe('parseError', () => {
  it('should return native error message and stack', () => {
    const error = new Error('error')
    const result = parseError(error)
    expect(result).toEqual({ message: error.message, stack: error.stack })
  })

  it('should return string error', () => {
    const result = parseError('error')
    expect(result).toEqual({ message: 'error' })
  })
})
