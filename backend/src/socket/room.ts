import { Socket } from 'socket.io'
import { logger } from '../libs/logger'

export type User = { name: string; observer: boolean; vote: string }

export function room(socket: Socket) {
  let voting = true
  const users: Record<string, User> = {}

  socket.on('join', (user: Omit<User, 'vote'>) => {
    if (!users[socket.id]) {
      users[socket.id] = { ...user, vote: '' }
      logger.info('user_join', { room: socket.nsp.name, user: users[socket.id] })
      socket.nsp.emit('refresh', { voting, users })
    }
  })

  socket.on('vote', (vote: string) => {
    if (users[socket.id]) {
      users[socket.id].vote = vote
      logger.info('user_vote', { room: socket.nsp.name, user: users[socket.id] })
      socket.nsp.emit('refresh', { voting, users })
    }
  })

  socket.on('disconnect', () => {
    if (users[socket.id]) {
      logger.info('user_disconnect', { room: socket.nsp.name, user: users[socket.id] })
      delete users[socket.id]
      socket.nsp.emit('refresh', { voting, users })
    }
  })

  socket.on('voting', (value: boolean) => {
    voting = value
    if (voting) {
      Object.values(users).forEach((user) => (user.vote = ''))
    }
    socket.nsp.emit('refresh', { voting, users })
  })
}
