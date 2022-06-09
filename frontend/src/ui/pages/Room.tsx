import React, { useMemo } from 'react'
import { useRoomSocket } from '../../hooks/useRoomSocket'
import { User } from '../../models/User'
import { getVotes } from '../../utils/getVotes'
import { Cards } from '../components/Cards'
import { Observers } from '../components/Observers'
import { Result } from '../components/Result'

interface IRoomProps {
  user: Omit<User, 'vote'>
}

export function Room({ user }: IRoomProps): JSX.Element {
  const { users, voting, vote, canShowVotes, onVote, onChangeStatus } = useRoomSocket(user)
  const votes = useMemo(() => getVotes(users), [users])

  const voters = users.filter((user) => !user.observer)
  const observers = users.filter((user) => user.observer)

  return (
    <>
      <header className="p4 center">
        {!user.observer && <Cards vote={vote} onVote={onVote} active={voting} />}
        <button
          className="mr3"
          disabled={!canShowVotes || !voting}
          data-variant={voting ? 'primary' : ''}
          onClick={onChangeStatus}
        >
          Show votes
        </button>
        <button disabled={voting} data-variant={voting ? '' : 'primary'} onClick={onChangeStatus}>
          Reset
        </button>
      </header>
      <div className="mx-auto max-width-4 pb2">
        <Observers users={observers} />
        <h2>Votes</h2>
        <Result users={voters} votes={votes} hidden={voting} />
      </div>
    </>
  )
}
