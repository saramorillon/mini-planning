import io from 'socket.io'
import { Socket } from './socket'

export type User = { name: string; observer: boolean; vote: string }

export class Namespace {
  voting = true
  private clients: Record<string, User> = {}

  constructor(public namespace: io.Namespace) {
    this.namespace.on('connection', (socket) => {
      new Socket(this, socket)
    })
  }

  emit = this.namespace.emit.bind(this.namespace)

  kickUser(username: string): void {
    const existingSocket = Object.keys(this.clients).find((key) => this.clients[key].name === username)
    if (existingSocket) this.namespace.sockets.get(existingSocket)?.disconnect()
  }

  getClients(): Record<string, User> {
    return this.clients
  }

  getClient(id: string): User | undefined {
    return this.clients[id]
  }

  setClient(id: string, user: User): void {
    this.clients[id] = user
  }

  deleteClient(id: string): void {
    delete this.clients[id]
  }
}
