import io from 'socket.io'
import { Namespace, User } from '@src/socket/namespace'

type Users = Record<string, string>
type Votes = Record<string, number>

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
    this.namespace.clients[this.socket.id] = { name, vote: '' }
    this.refresh()
  }

  onVote(vote: string): void {
    this.vote(this.socket.id, vote)
    this.refresh()
  }

  onVoting(voting: boolean): void {
    this.namespace.voting = voting
    if (voting === true) {
      for (const socketId of Object.keys(this.namespace.clients)) {
        this.vote(socketId, '')
      }
    }
    this.refresh()
  }

  onDisconnect(): void {
    delete this.namespace.clients[this.socket.id]
    this.refresh()
  }

  vote(socketId: string, vote: string): void {
    if (!this.namespace.clients[socketId]) {
      this.namespace.clients[socketId] = { name: 'Unknown', vote: '' }
    }
    this.namespace.clients[socketId].vote = vote
  }

  refresh(): void {
    const clients = Object.values(this.namespace.clients)
    const users = clients.reduce((acc: Users, curr: User) => ({ ...acc, [curr.name]: curr.vote || '' }), {})
    const votes = clients.reduce(
      (acc: Votes, curr: User) => ({
        ...acc,
        total: acc.total + 1,
        [curr.vote]: (acc[curr.vote] || 0) + 1,
      }),
      { total: 0 }
    )
    this.namespace.emit('refresh', { voting: this.namespace.voting, users, votes })
  }
}
