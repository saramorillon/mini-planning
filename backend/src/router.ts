import express from 'express'
import { getApp } from './controllers/app/getApp'
import { postRoom } from './controllers/room/postRoom'

export const router = express.Router()

router.get('/app', getApp)
router.post('/room/:id', postRoom)
