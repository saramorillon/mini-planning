import express from 'express'
import helmet from 'helmet'
import { createServer } from 'http'
import { join } from 'path'
import { config } from '@src/config'
import { logger } from '@src/libs/logger'
import { router } from '@src/router'
import { IoService } from '@src/socket/io'

const { port } = config

const { contentSecurityPolicy } = config

const app = express()
app.use(express.static(config.publicDir))
app.use(helmet({ contentSecurityPolicy }))
app.use('/api', router)
app.get('*', (req, res) => res.sendFile(join(config.publicDir, 'index.html')))

const http = createServer(app)
http.listen(port, () => {
  logger.info('app_start', { port: port })
})

IoService.init(http)
