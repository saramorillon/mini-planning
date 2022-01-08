import { Router } from 'express'
import { getApp } from './controllers/app/getApp'
import { postRoom } from './controllers/room/postRoom'

export function router(): Router {
  const router = Router()

  router.get('/app', getApp)
  router.post('/room/:id', postRoom)

  return router
}
