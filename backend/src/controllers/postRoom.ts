import { Request, Response } from 'express'
import { io } from '../app'
import { initNamespace } from '../libs/namespace'

export function postRoom(req: Request, res: Response): void {
  const namespace = `/${req.params.id}`
  if (!io._nsps.has(namespace)) {
    initNamespace(namespace)
  }
  res.sendStatus(204)
}
