import type { Socket } from 'socket.io'
import { log } from './logger.js'

export type User = { name: string; observer: boolean; vote: string }

export const rooms: Record<string, { voting: boolean; users: Record<string, User> }> = {}

export function room(socket: Socket) {
  if (!rooms[socket.nsp.name]) {
    rooms[socket.nsp.name] = { voting: true, users: {} }
  }

  const room = rooms[socket.nsp.name]

  socket.on('join', (user: Omit<User, 'vote'>) => {
    if (!room.users[socket.id]) {
      room.users[socket.id] = { ...user, vote: '' }
      log('info', 'user_join', { room: socket.nsp.name, user: room.users[socket.id] })
      socket.nsp.emit('refresh', room)
    }
  })

  socket.on('vote', (vote: string) => {
    if (room.users[socket.id]) {
      room.users[socket.id].vote = vote
      log('info', 'user_vote', { room: socket.nsp.name, user: room.users[socket.id] })
      socket.nsp.emit('refresh', room)
    }
  })

  socket.on('disconnect', () => {
    if (room.users[socket.id]) {
      log('info', 'user_disconnect', { room: socket.nsp.name, user: room.users[socket.id] })
      delete room.users[socket.id]
      socket.nsp.emit('refresh', room)
    }
    if (Object.keys(room.users).length === 0) {
      delete rooms[socket.nsp.name]
    }
  })

  socket.on('voting', (voting: boolean) => {
    room.voting = voting
    if (room.voting) {
      for (const user of Object.values(room.users)) {
        user.vote = ''
      }
    }
    socket.nsp.emit('refresh', room)
  })
}
