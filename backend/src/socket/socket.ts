import io from 'socket.io'
import { Namespace } from '@src/socket/namespace'

export class Socket {
  constructor(private namespace: Namespace, private socket: io.Socket) {
    this.onJoin = this.onJoin.bind(this)
    this.onVote = this.onVote.bind(this)
    this.onVoting = this.onVoting.bind(this)
    this.onDisconnect = this.onDisconnect.bind(this)
    socket.on('join', this.onJoin)
    socket.on('vote', this.onVote)
    socket.on('voting', this.onVoting)
    socket.on('disconnect', this.onDisconnect)
  }

  onJoin(name: string): void {
    this.namespace.clients[this.socket.id] = [name, '']
    this.refresh()
  }

  onVote(vote: string): void {
    this.vote(this.socket.id, vote)
    this.refresh()
  }

  onVoting(voting: boolean): void {
    this.namespace.emit('voting', voting)
    if (voting === true) {
      for (const socketId of Object.keys(this.namespace.clients)) {
        this.vote(socketId, '')
      }
      this.refresh()
    }
  }

  onDisconnect(): void {
    delete this.namespace.clients[this.socket.id]
    this.refresh()
  }

  vote(socketId: string, vote: string): void {
    if (!this.namespace.clients[socketId]) {
      this.namespace.clients[socketId] = ['Unknown', vote]
    }
    this.namespace.clients[socketId][1] = vote
  }

  refresh(): void {
    this.namespace.emit('refresh', Object.values(this.namespace.clients))
  }
}
