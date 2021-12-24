import { Request, Response } from 'express'
import { author, name, repository, version } from '../../../package.json'
import { start } from '../../libs/logger'

export function getApp(req: Request, res: Response): void {
  const { success, failure } = start('get_app')
  try {
    res.json({ name, version, repository, author })
    success()
  } catch (error) {
    res.sendStatus(500)
    failure(error)
  }
}
