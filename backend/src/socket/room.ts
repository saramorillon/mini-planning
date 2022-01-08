import { Namespace, Socket } from 'socket.io'
import { logger } from '../libs/logger'
import { IoService } from './io'

export type User = { name: string; observer: boolean; vote: string }

export class Room {
  private namespace: Namespace
  private voting = true
  private users: Record<string, User> = {}

  constructor(id: string) {
    this.namespace = IoService.createNamespace(id)
    this.namespace.on('connection', (socket) => {
      socket.on('join', this.onJoin.bind(this, socket))
      socket.on('vote', this.onVote.bind(this, socket))
      socket.on('disconnect', this.onDisconnect.bind(this, socket))
      socket.on('voting', this.onVoting.bind(this))
    })
  }

  private onJoin(socket: Socket, user: Omit<User, 'vote'>): void {
    if (!this.users[socket.id]) {
      this.users[socket.id] = { ...user, vote: '' }
      logger.info('user_join', { room: this.namespace.name, user: this.users[socket.id] })
      this.refresh()
    }
  }

  private onVote(socket: Socket, vote: string): void {
    if (this.users[socket.id]) {
      this.users[socket.id].vote = vote
      logger.info('user_vote', { room: this.namespace.name, user: this.users[socket.id] })
      this.refresh()
    }
  }

  private onDisconnect(socket: Socket): void {
    if (this.users[socket.id]) {
      logger.info('user_disconnect', { room: this.namespace.name, user: this.users[socket.id] })
      delete this.users[socket.id]
      this.refresh()
    }
  }

  private onVoting(voting: boolean): void {
    this.voting = voting
    if (voting) {
      Object.values(this.users).forEach((user) => (user.vote = ''))
    }
    this.refresh()
  }

  private refresh() {
    this.namespace.emit('refresh', { voting: this.voting, users: this.users })
  }
}
