import { Callout } from '@blueprintjs/core'
import axios from 'axios'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import io from 'socket.io-client'
import { User } from '@src/models/User'
import { Cards } from '@src/ui/components/Cards/Cards'
import { Result } from '@src/ui/components/Result/Result'
import { VoteButton } from '@src/ui/components/VoteButton/VoteButton'

interface IRoomProps {
  id: string
  user: Omit<User, 'vote'>
}

export function Room({ id, user }: IRoomProps): JSX.Element {
  const [socket, setSocket] = useState<SocketIOClient.Socket>()
  const [voting, setVoting] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [votes, setVotes] = useState<Record<string, number>>({})

  useEffect(() => {
    axios.post(`/api/room/${id}`).then(() => {
      const socket = io(`/${id}`, { transports: ['polling'] })
      socket.on('connect', () => setSocket(socket))
    })
  }, [id])

  useEffect(() => {
    socket?.emit('join', user)
    socket?.on(
      'refresh',
      ({ voting, users, votes }: { voting: boolean; users: User[]; votes: Record<string, number> }) => {
        setVoting(voting)
        setUsers(users)
        setVotes(votes)
      }
    )
  }, [socket, user])

  const onClick = useCallback(() => socket?.emit('voting', !voting), [socket, voting])

  const onVote = useCallback((vote) => socket?.emit('vote', { ...user, vote }), [user, socket])

  const { observer, vote } = users.find(({ name }) => name === user.name) || {}
  const voters = useMemo(() => users.filter((user) => !user.observer), [users])
  const hasMissingVote = useMemo(() => voters.some((voter) => voter.vote === ''), [voters])

  return (
    <>
      <Callout className="p4 center">
        <h1>Choose a card</h1>
        <Cards vote={vote} onVote={onVote} active={voting && !observer} />
        <VoteButton onClick={onClick} voting={voting} disabled={hasMissingVote} />
      </Callout>
      <div className="mx-auto max-width-4">
        <h2>Votes</h2>
        <Result users={users} votes={votes} hidden={voting} />
      </div>
    </>
  )
}
