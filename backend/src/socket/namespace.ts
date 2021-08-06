import io from 'socket.io'
import { Socket } from '@src/socket/socket'

export type User = { name: string; observer: boolean; vote: string }

export class Namespace {
  voting = true
  clients: Record<string, User> = {}

  constructor(public namespace: io.Namespace) {
    this.namespace.on('connection', (socket) => {
      new Socket(this, socket)
    })
  }

  emit = this.namespace.emit.bind(this.namespace)
}
