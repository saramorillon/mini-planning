import { IoService } from '@src/socket/io'
import { Request, Response } from 'express'

export function postRoom(req: Request, res: Response): void {
  const namespace = `/${req.params.id}`
  IoService.initNamespace(namespace)
  res.sendStatus(204)
}
