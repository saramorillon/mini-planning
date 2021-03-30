import { http } from './app'
import { config } from './config'
import { logger } from './libs/logger'

const { port } = config

http.listen(port, () => {
  logger.info('app_start', { port: port })
})
