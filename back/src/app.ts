import { createServer } from 'node:http'
import { join } from 'node:path'
import express, { type Request, type Response, static as staticDir } from 'express'
import helmet from 'helmet'
import { Server } from 'socket.io'
import project from '../package.json' with { type: 'json' }
import { config } from './config.js'
import { room } from './room.js'

const { contentSecurityPolicy, publicDir } = config

export function createApp() {
  const app = express()
  app.use(staticDir(publicDir))
  app.use(helmet({ contentSecurityPolicy, crossOriginEmbedderPolicy: false }))
  app.use('/api/app', getApp)
  app.get('*', renderFile)

  const http = createServer(app)

  new Server(http).of(/^\/.+$/).on('connection', room)

  return http
}

export function renderFile(req: Request, res: Response): void {
  res.sendFile(join(publicDir, 'index.html'))
}

export function getApp(req: Request, res: Response): void {
  res.json({ name: project.name, version: project.version, repository: project.repository, author: project.author })
}
