import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import type { User } from '../models/User.js'

export interface IRoomProps {
  users: User[]
  voting: boolean
  vote: string
  onChangeStatus: () => void
  onVote: (vote: string) => void
}

export function useSocket(user: Omit<User, 'vote'>): IRoomProps {
  const { id } = useParams<{ id: string }>()
  const socket = useMemo(() => io(`/${id}`, { transports: ['polling'] }), [id])
  const [users, setUsers] = useState<Record<string, User>>({})
  const [voting, setVoting] = useState(true)

  const vote = useMemo(() => (socket.id && users[socket.id]?.vote) || '', [users, socket])

  useEffect(() => {
    socket.on('connect', () => socket.emit('join', user))
    socket.on('refresh', ({ voting, users }: { voting: boolean; users: Record<string, User> }) => {
      setUsers(users)
      setVoting(voting)
    })

    return () => {
      socket.disconnect()
    }
  }, [socket, user])

  const onChangeStatus = useCallback(() => socket.emit('voting', !voting), [socket, voting])

  const onVote = useCallback((vote: string) => socket.emit('vote', vote), [socket])

  return useMemo(
    () => ({ users: Object.values(users), voting, vote, onVote, onChangeStatus }),
    [users, voting, vote, onVote, onChangeStatus],
  )
}
