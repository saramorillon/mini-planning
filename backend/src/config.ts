import { bool, cleanEnv, num, str } from 'envalid'
import { ContentSecurityPolicyOptions } from 'helmet/dist/middlewares/content-security-policy'

const env = cleanEnv(process.env, {
  APP_PORT: num({ default: 80 }),
  LOG_LEVEL: str({ choices: ['debug', 'info', 'warn', 'error'], default: 'info' }),
  LOG_SILENT: bool({ default: false }),
  PUBLIC_DIR: str(),
})

interface IConfig {
  environment?: string
  port: number
  logLevel: 'debug' | 'info' | 'warn' | 'error'
  contentSecurityPolicy: ContentSecurityPolicyOptions
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
