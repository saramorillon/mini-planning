import io from 'socket.io'
import { Socket } from '@src/socket/socket'

export class Namespace {
  clients: Record<string, [string, string]> = {}

  constructor(public namespace: io.Namespace) {
    this.namespace.on('connection', (socket) => {
      new Socket(this, socket)
    })
  }

  emit = this.namespace.emit.bind(this.namespace)
}
