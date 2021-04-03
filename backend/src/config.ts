import { cleanEnv, num, str } from 'envalid'
import { ContentSecurityPolicyOptions } from 'helmet/dist/middlewares/content-security-policy'

const env = cleanEnv(process.env, {
  APP_KEY: str(),
  APP_PORT: num({ default: 80 }),
  LOG_LEVEL: str({ choices: ['debug', 'info', 'warn', 'error'], default: 'info' }),
  PUBLIC_DIR: str(),
})

interface IConfig {
  environment?: string
  port: number
  logLevel: 'debug' | 'info' | 'warn' | 'error'
  contentSecurityPolicy: ContentSecurityPolicyOptions
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
  publicDir: env.PUBLIC_DIR,
}
