import { createApp } from './app'
import { config } from './config'
import { logger } from './logger'

const { port } = config

createApp().listen(port, () => {
  logger.info('app_start', { port })
})
