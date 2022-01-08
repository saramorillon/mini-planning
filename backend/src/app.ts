import express, { Request, Response, static as staticDir } from 'express'
import helmet from 'helmet'
import { createServer, Server } from 'http'
import { join } from 'path'
import { config } from './config'
import { router } from './router'
import { IoService } from './socket/io'

const { contentSecurityPolicy, publicDir } = config

export function createApp(): Server {
  const app = express()
  app.use(staticDir(publicDir))
  app.use(helmet({ contentSecurityPolicy }))
  app.use('/api', router())
  app.get('*', renderFile)

  const http = createServer(app)
  IoService.init(http)

  return http
}

export function renderFile(req: Request, res: Response): void {
  res.sendFile(join(publicDir, 'index.html'))
}
