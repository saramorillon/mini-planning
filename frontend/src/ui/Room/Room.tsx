import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Container, Jumbotron } from 'reactstrap'
import io from 'socket.io-client'
import { Cards } from '../Cards/Cards'
import { Result } from '../Result/Result'
import { VoteButton } from '../VoteButton/VoteButton'

interface IRoomProps {
  id: string
  name: string
}

export function Room({ id, name }: IRoomProps): JSX.Element {
  const [socket, setSocket] = useState<SocketIOClient.Socket>()
  const [voting, setVoting] = useState(true)
  const [users, setUsers] = useState<Record<string, string>>({})
  const [votes, setVotes] = useState<Record<string, number>>({})

  useEffect(() => {
    axios.post(`/room/${id}`).then(() => {
      const socket = io(`/${id}`)
      socket.on('connect', () => setSocket(socket))
    })
  }, [id])

  useEffect(() => {
    socket?.emit('join', name)
    socket?.on('refresh', ({ voting, users, votes }) => {
      setVoting(voting)
      setUsers(users)
      setVotes(votes)
    })
  }, [socket, name])

  const onClick = useCallback(() => socket?.emit('voting', !voting), [socket, voting])

  const onVote = useCallback((vote) => socket?.emit('vote', vote), [socket])

  return (
    <>
      <Jumbotron className="text-center">
        <h2>Choose a card</h2>
        <Cards vote={users[name]} onVote={onVote} active={voting} />
        <VoteButton onClick={onClick} voting={voting} />
      </Jumbotron>
      <Container>
        <h2>Votes</h2>
        <Result users={users} votes={votes} hidden={voting} />
      </Container>
    </>
  )
}
