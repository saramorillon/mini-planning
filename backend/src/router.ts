import express from 'express'
import { getApp } from '@src/controllers/app/getApp'
import { postRoom } from '@src/controllers/room/postRoom'

export const router = express.Router()

router.get('/app', getApp)
router.post('/room/:id', postRoom)
