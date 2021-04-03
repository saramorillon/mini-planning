import express from 'express'
import { postRoom } from '@src/controllers/postRoom'
import { renderFront } from '@src/controllers/renderFront'

export const router = express.Router()

router.get('*', renderFront)
router.post('/room/:id', postRoom)
