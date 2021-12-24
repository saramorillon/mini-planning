import io from 'socket.io'
import { Namespace, User } from '@src/socket/namespace'

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

  onJoin(user: Omit<User, 'vote'>): void {
    const existingClient = this.namespace.findClient(user.name)
    if (existingClient) this.namespace.disconnectSocket(existingClient)
    this.namespace.clients[this.socket.id] = { ...user, vote: '' }
    this.refresh()
  }

  onVote(user: User): void {
    this.vote(this.socket.id, user)
    this.refresh()
  }

  onVoting(voting: boolean): void {
    this.namespace.voting = voting
    if (voting === true) {
      for (const socketId of Object.keys(this.namespace.clients)) {
        this.vote(socketId, { ...this.namespace.clients[socketId], vote: '' })
      }
    }
    this.refresh()
  }

  onDisconnect(): void {
    delete this.namespace.clients[this.socket.id]
    this.refresh()
  }

  vote(socketId: string, user: User): void {
    this.namespace.clients[socketId] = user
  }

  refresh(): void {
    const users = Object.values(this.namespace.clients)
    const votes = users.reduce(
      (acc: Votes, curr: User) => ({ ...acc, total: acc.total + 1, [curr.vote]: (acc[curr.vote] || 0) + 1 }),
      { total: 0 }
    )
    this.namespace.emit('refresh', { voting: this.namespace.voting, users, votes })
  }
}
