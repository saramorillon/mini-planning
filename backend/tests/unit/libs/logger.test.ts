import { logger, parseError, start } from '../../../src/libs/logger'

describe('start', () => {
  it('should log message and meta', () => {
    jest.spyOn(logger, 'info')
    start('message', { prop: 'value' })
    expect(logger.info).toHaveBeenCalledWith('message', { prop: 'value' })
  })

  it('should return log functions', () => {
    const fn = start('message', { prop: 'value' })
    expect(fn.success).toBeInstanceOf(Function)
    expect(fn.failure).toBeInstanceOf(Function)
  })

  it('should log message with "_success"', () => {
    jest.spyOn(logger, 'info')
    const { success } = start('message', { prop: 'value' })
    success()
    expect(logger.info).toHaveBeenCalledWith('message_success', { prop: 'value' })
  })

  it('should log message with "_failure" and error', () => {
    jest.spyOn(logger, 'error')
    const { failure } = start('message', { prop: 'value' })
    const error = new Error('error')
    failure(error)
    expect(logger.error).toHaveBeenCalledWith('message_failure', {
      prop: 'value',
      error: { message: error.message, stack: error.stack },
    })
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
