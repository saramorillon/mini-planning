import express from 'express'
import helmet from 'helmet'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { config } from './config'
import { router } from './router'

const { contentSecurityPolicy } = config

const app = express()
export const http = createServer(app)
export const io = new Server(http)

app.use(express.static(config.publicDir))
app.use(helmet({ contentSecurityPolicy }))
app.use(router)
