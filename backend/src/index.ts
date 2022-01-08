import { createApp } from './app'
import { config } from './config'
import { logger } from './libs/logger'

const { port } = config

createApp().listen(port, () => {
  logger.info('app_start', { port })
})
