import express, { Request, Response, static as staticDir } from 'express'
import helmet from 'helmet'
import { createServer } from 'http'
import { join } from 'path'
import { Server } from 'socket.io'
import { config } from './config'
import { getApp } from './controllers/app/getApp'
import { room } from './socket/room'

const { contentSecurityPolicy, publicDir } = config

export function createApp() {
  const app = express()
  app.use(staticDir(publicDir))
  app.use(helmet({ contentSecurityPolicy }))
  app.use('/api/app', getApp)
  app.get('*', renderFile)

  const http = createServer(app)

  new Server(http).of(/^\/.+$/).on('connection', room)

  return http
}

export function renderFile(req: Request, res: Response): void {
  res.sendFile(join(publicDir, 'index.html'))
}
