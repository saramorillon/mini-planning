import path from 'path'
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
  level: config.logLevel,
  transports: [fileTransport(), consoleTransport()],
  silent: config.environment === 'test',
})
