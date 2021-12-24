import express from 'express'
import helmet from 'helmet'
import { createServer } from 'http'
import { join } from 'path'
import { config } from './config'
import { logger } from './libs/logger'
import { router } from './router'
import { IoService } from './socket/io'

const { contentSecurityPolicy, publicDir, port } = config

const app = express()
app.use(express.static(publicDir))
app.use(helmet({ contentSecurityPolicy }))
app.use('/api', router)
app.get('*', (req, res) => res.sendFile(join(publicDir, 'index.html')))

const http = createServer(app)
http.listen(port, () => {
  logger.info('app_start', { port: port })
})

IoService.init(http)
