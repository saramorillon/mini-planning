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

  disconnectSocket(socketId: string): void {
    const socket: io.Socket = this.namespace.sockets.get(socketId)
    socket.disconnect()
  }

  findClient(name: string): string | undefined {
    return Object.keys(this.clients).find((key) => this.clients[key].name === name)
  }
}
