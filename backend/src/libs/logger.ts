import path from 'path'
import { types } from 'util'
import { createLogger, format, transports } from 'winston'
import { name } from '../../package.json'
import { config } from '../config'

const dirname = path.join(__dirname, '..', '..', 'logs')

function fileFormat() {
  return format.combine(format.timestamp(), format.json())
}

function consoleFormat() {
  return format.combine(format.timestamp(), format.colorize(), format.simple())
}

function fileTransport() {
  return new transports.File({ format: fileFormat(), dirname, filename: name, maxsize: 5242880, maxFiles: 5 })
}

function consoleTransport() {
  return new transports.Console({ format: consoleFormat() })
}

export const logger = createLogger({
  level: 'info',
  transports: [fileTransport(), consoleTransport()],
  silent: config.logSilent,
})

interface IAction {
  success: () => void
  failure: (error: unknown) => void
}

export function start(message: string, meta?: Record<string, unknown>): IAction {
  logger.info(message, meta)

  return {
    success: () => logger.info(message + '_success', meta),
    failure: (error) => logger.error(message + '_failure', { ...meta, error: parseError(error) }),
  }
}

export function parseError(error: unknown): { message: string; stack?: string } {
  if (types.isNativeError(error)) {
    return { message: error.message, stack: error.stack }
  }
  return { message: String(error) }
}
