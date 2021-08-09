import axios from 'axios'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Container, Jumbotron } from 'reactstrap'
import io from 'socket.io-client'
import { Cards } from '../Cards/Cards'
import { Result } from '../Result/Result'
import { VoteButton } from '../VoteButton/VoteButton'
import { User } from '@src/models/User'

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
    axios.post(`/room/${id}`).then(() => {
      const socket = io(`/${id}`)
      socket.on('connect', () => setSocket(socket))
    })
  }, [id])

  useEffect(() => {
    socket?.emit('join', user)
    socket?.on('refresh', ({ voting, users, votes }) => {
      setVoting(voting)
      setUsers(users)
      setVotes(votes)
    })
  }, [socket, user])

  const onClick = useCallback(() => socket?.emit('voting', !voting), [socket, voting])

  const onVote = useCallback((vote) => socket?.emit('vote', vote), [socket])

  const { observer, vote } = users.find(({ name }) => name === user.name) || {}
  const voters = useMemo(() => users.filter((user) => !user.observer), [users])
  const hasMissingVote = useMemo(() => voters.some((voter) => voter.vote === ''), [voters])

  return (
    <>
      <Jumbotron className="text-center">
        <h2>Choose a card</h2>
        <Cards vote={vote} onVote={onVote} active={voting && !observer} />
        <VoteButton onClick={onClick} voting={voting} disabled={hasMissingVote} />
      </Jumbotron>
      <Container>
        <h2>Votes</h2>
        <Result users={users} votes={votes} hidden={voting} />
      </Container>
    </>
  )
}
