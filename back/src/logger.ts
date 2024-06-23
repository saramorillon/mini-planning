import { types } from 'node:util'

interface IAction {
  success: () => void
  failure: (error: unknown) => void
}

export function log(level: 'info' | 'error', message: string, meta?: Record<string, unknown>) {
  const timestamp = new Date().toISOString()
  console[level](JSON.stringify({ level, timestamp, message, ...meta }))
}

export function start(message: string, meta?: Record<string, unknown>): IAction {
  log('info', message, meta)

  return {
    success: () => log('info', `${message}_success`, meta),
    failure: (error) => log('error', `${message}_failure`, { ...meta, error: parseError(error) }),
  }
}

export function parseError(error: unknown): { message: string; stack?: string } {
  if (types.isNativeError(error)) {
    return { message: error.message, stack: error.stack }
  }
  return { message: String(error) }
}
