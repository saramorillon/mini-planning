import { Request, Response } from 'express'
import { version } from '../../package.json'

export function getVersion(req: Request, res: Response): void {
  res.send(version)
}
