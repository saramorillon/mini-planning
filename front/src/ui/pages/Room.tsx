import React, { useMemo } from 'react'
import { useSocket } from '../../hooks/useSocket.js'
import type { User } from '../../models/User.js'
import { getVotes } from '../../utils/getVotes.js'
import { Cards } from '../components/Cards.js'
import { Observers } from '../components/Observers.js'
import { Result } from '../components/Result.js'

interface IRoomProps {
  user: Omit<User, 'vote'>
}

export function Room({ user }: IRoomProps): JSX.Element {
  const { users, voting, vote, onVote, onChangeStatus } = useSocket(user)
  const votes = useMemo(() => getVotes(users), [users])

  const voters = users.filter((user) => !user.observer)
  const observers = users.filter((user) => user.observer)

  return (
    <>
      <header className="p4 center">
        {!user.observer && <Cards vote={vote} onVote={onVote} active={voting} />}
        <button
          type="button"
          className="mr3"
          disabled={!voting}
          data-variant={voting ? 'primary' : ''}
          onClick={onChangeStatus}
        >
          Show votes
        </button>
        <button type="button" disabled={voting} data-variant={voting ? '' : 'primary'} onClick={onChangeStatus}>
          Reset all votes
        </button>
      </header>
      <div className="px4 mx-auto max-width-4 pb2">
        <Observers users={observers} />
        <h2>Votes</h2>
        <Result users={voters} votes={votes} hidden={voting} />
      </div>
    </>
  )
}
