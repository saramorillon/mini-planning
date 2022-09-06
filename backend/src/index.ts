import { createApp } from './app'
import { config } from './config'
import { log } from './logger'

const { port } = config

createApp().listen(port, () => {
  log('info', 'app_start', { port })
})
