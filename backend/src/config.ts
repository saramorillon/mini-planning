import { bool, cleanEnv, num, str } from 'envalid'
import { HelmetOptions } from 'helmet'

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production']}),
  APP_PORT: num({ default: 80 }),
  LOG_LEVEL: str({ choices: ['debug', 'info', 'warn', 'error'], default: 'info' }),
  LOG_SILENT: bool({ default: false }),
  PUBLIC_DIR: str(),
})

interface IConfig {
  environment?: string
  port: number
  logLevel: 'debug' | 'info' | 'warn' | 'error'
  contentSecurityPolicy: HelmetOptions['contentSecurityPolicy']
  logSilent: boolean
  publicDir: string
}

export const config: IConfig = {
  environment: env.NODE_ENV,
  port: env.APP_PORT,
  logLevel: env.LOG_LEVEL,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
    },
  },
  logSilent: env.LOG_SILENT,
  publicDir: env.PUBLIC_DIR,
}
