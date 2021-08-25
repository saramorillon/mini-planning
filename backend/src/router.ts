import express from 'express'
import { postRoom } from '@src/controllers/postRoom'
import { renderFront } from '@src/controllers/renderFront'
import { getVersion } from '@src/controllers/getVersion'

export const router = express.Router()

router.get('/version', getVersion)
router.get('*', renderFront)
router.post('/room/:id', postRoom)
