import express from 'express'
import helmet from 'helmet'
import { createServer } from 'http'
import { config } from './config'
import { logger } from './libs/logger'
import { router } from './router'
import { IoService } from './socket/io'

const { port } = config

const { contentSecurityPolicy } = config

const app = express()
app.use(express.static(config.publicDir))
app.use(helmet({ contentSecurityPolicy }))
app.use(router)

const http = createServer(app)
http.listen(port, () => {
  logger.info('app_start', { port: port })
})

IoService.init(http)
