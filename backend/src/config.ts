import { bool, cleanEnv, num, str } from 'envalid'
import { HelmetOptions } from 'helmet'

const env = cleanEnv(process.env, {
  APP_PORT: num({ default: 80 }),
  LOG_SILENT: bool({ default: false }),
  PUBLIC_DIR: str(),
})

interface IConfig {
  port: number
  contentSecurityPolicy: HelmetOptions['contentSecurityPolicy']
  logSilent: boolean
  publicDir: string
}

export const config: IConfig = {
  port: env.APP_PORT,
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
