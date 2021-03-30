import express from 'express'
import { postRoom } from './controllers/postRoom'
import { renderFront } from './controllers/renderFront'

export const router = express.Router()

router.get('*', renderFront)
router.post('/room/:id', postRoom)
