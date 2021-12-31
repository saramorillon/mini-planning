import io from 'socket.io'
import { logger } from '../libs/logger'
import { Namespace, User } from './namespace'

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

  private onJoin(user: Omit<User, 'vote'>) {
    logger.info('user_join', { room: this.namespace.namespace.name, user })
    this.namespace.kickUser(user.name)
    this.namespace.setClient(this.socket.id, { ...user, vote: '' })
    this.refresh()
  }

  private onVote(user: User) {
    logger.info('user_vote', { room: this.namespace.namespace.name, user })
    this.namespace.setClient(this.socket.id, user)
    this.refresh()
  }

  private onVoting(voting: boolean) {
    this.namespace.voting = voting
    if (voting === true) {
      for (const user of Object.values(this.namespace.getClients())) {
        user.vote = ''
      }
    }
    this.refresh()
  }

  private onDisconnect() {
    const user = this.namespace.getClient(this.socket.id)
    logger.info('user_disconnect', { room: this.namespace.namespace.name, user })
    this.namespace.deleteClient(this.socket.id)
    this.refresh()
  }

  private refresh() {
    const users = Object.values(this.namespace.getClients())
    const votes = users.reduce(
      (acc: Votes, curr: User) => ({ ...acc, total: acc.total + 1, [curr.vote]: (acc[curr.vote] || 0) + 1 }),
      { total: 0 }
    )
    this.namespace.emit('refresh', { voting: this.namespace.voting, users, votes })
  }
}
