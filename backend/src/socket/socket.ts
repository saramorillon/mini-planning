import io from 'socket.io'
import { Namespace } from '@src/socket/namespace'

export class Socket {
  constructor(private namespace: Namespace, private socket: io.Socket) {
    socket.on('join', this.onJoin.bind(this))
    socket.on('vote', this.onVote.bind(this))
    socket.on('voting', this.onVoting.bind(this))
    socket.on('disconnect', this.onDisconnect.bind(this))
  }

  onJoin(name: string): void {
    this.namespace.clients[this.socket.id] = [name, '']
    this.refresh()
  }

  onVote(vote: string): void {
    this.namespace.clients[this.socket.id][1] = vote
    this.refresh()
  }

  onVoting(voting: boolean): void {
    this.namespace.emit('voting', voting)
    if (voting === true) {
      for (const socketId of Object.keys(this.namespace.clients)) {
        this.namespace.clients[socketId][1] = ''
      }
      this.refresh()
    }
  }

  onDisconnect(): void {
    delete this.namespace.clients[this.socket.id]
    this.refresh()
  }

  refresh(): void {
    this.namespace.emit('refresh', Object.values(this.namespace.clients))
  }
}
