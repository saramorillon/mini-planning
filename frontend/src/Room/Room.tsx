import axios from 'axios'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Container, Jumbotron } from 'reactstrap'
import io from 'socket.io-client'
import { Cards } from '../Cards/Cards'
import { Result } from '../Result/Result'

interface IRoomProps {
  id: string
  name: string
}

export function Room({ id, name }: IRoomProps): JSX.Element {
  const [socket, setSocket] = useState<SocketIOClient.Socket>()
  const [voting, setVoting] = useState(true)
  const [users, setUsers] = useState<[string, string][]>([])

  useEffect(() => {
    axios.post(`/room/${id}`).then(() => {
      const socket = io(`/${id}`)
      socket.on('connect', () => {
        setSocket(socket)
      })
    })
  }, [id])

  useEffect(() => {
    socket?.emit('join', name)
    socket?.on('refresh', setUsers)
    socket?.on('voting', setVoting)
  }, [socket, name])

  const onClick = useCallback(() => {
    socket?.emit('voting', !voting)
  }, [socket, voting])

  const onVote = useCallback(
    (vote) => {
      socket?.emit('vote', vote)
    },
    [socket]
  )

  const vote = useMemo(() => users.find(([user]) => user === name)?.[1] || '', [name, users])

  return (
    <>
      <Jumbotron className="text-center">
        <h2>Choose a card</h2>
        <Cards vote={vote} onVote={onVote} active={voting} />
        <Button color="primary" onClick={onClick}>
          {voting ? 'Show votes' : 'Reset'}
        </Button>
      </Jumbotron>
      <Container>
        <h2>Votes</h2>
        <Result users={users} hidden={voting} />
      </Container>
    </>
  )
}
