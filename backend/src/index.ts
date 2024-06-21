import { createApp } from './app.js'
import { config } from './config.js'
import { log } from './logger.js'

const { port } = config

createApp().listen(port, () => {
  log('info', 'app_start', { port })
})
