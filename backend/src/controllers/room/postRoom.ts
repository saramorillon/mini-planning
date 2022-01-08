import { Request, Response } from 'express'
import { start } from '../../libs/logger'
import { IoService } from '../../socket/io'

export function postRoom(req: Request, res: Response): void {
  const namespace = `/${req.params.id}`
  const { success, failure } = start('post_room', { namespace })
  try {
    IoService.initRoom(namespace)
    res.sendStatus(204)
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
