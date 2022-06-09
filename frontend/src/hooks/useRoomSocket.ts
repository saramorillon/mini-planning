import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import { User } from '../models/User'

export interface IRoomProps {
  users: User[]
  voting: boolean
  vote: string
  canShowVotes: boolean
  onChangeStatus: () => void
  onVote: (vote: string) => void
}

export function useRoomSocket(user: Omit<User, 'vote'>): IRoomProps {
  const { id } = useParams<{ id: string }>()
  const [socket, setSocket] = useState<Socket>()
  const [users, setUsers] = useState<Record<string, User>>({})
  const [voting, setVoting] = useState(true)

  const vote = useMemo(() => (socket ? users[socket.id]?.vote || '' : ''), [users, socket])

  const canShowVotes = useMemo(() => Object.values(users).every((user) => user.observer || user.vote), [users])

  useEffect(() => {
    void axios.post(`/api/room/${id}`).then(() => {
      setSocket(io(`/${id}`, { transports: ['polling'] }))
    })
  }, [id])

  useEffect(() => {
    socket?.on('connect', () => socket.emit('join', user))
    socket?.on('refresh', ({ voting, users }: { voting: boolean; users: Record<string, User> }) => {
      setUsers(users)
      setVoting(voting)
    })

    return () => {
      socket?.disconnect()
    }
  }, [socket, user])

  const onChangeStatus = useCallback(() => socket?.emit('voting', !voting), [socket, voting])

  const onVote = useCallback((vote) => socket?.emit('vote', vote), [socket])

  return { users: Object.values(users), voting, vote, canShowVotes, onVote, onChangeStatus }
}
