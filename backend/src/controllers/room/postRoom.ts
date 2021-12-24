import { Request, Response } from 'express'
import { start } from '@src/libs/logger'
import { IoService } from '@src/socket/io'

export function postRoom(req: Request, res: Response): void {
  const namespace = `/${req.params.id}`
  const { success, failure } = start('post_room', { namespace })
  try {
    IoService.initNamespace(namespace)
    res.sendStatus(204)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
