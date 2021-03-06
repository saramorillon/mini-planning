import { Request, Response } from 'express'
import path from 'path'
import { config } from '@src/config'

export function renderFront(req: Request, res: Response): void {
  res.sendFile(path.join(config.publicDir, 'index.html'))
}
