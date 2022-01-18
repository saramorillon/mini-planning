import { Button, Callout } from '@blueprintjs/core'
import React, { useMemo } from 'react'
import { useRoomSocket } from '../../../hooks/useRoomSocket'
import { User } from '../../../models/User'
import { getVotes } from '../../../utils/getVotes'
import { Cards } from '../../components/Cards/Cards'
import { Observers } from '../../components/Observers/Observers'
import { Result } from '../../components/Result/Result'

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
      <Callout className="p4 center">
        {!user.observer && <Cards vote={vote} onVote={onVote} active={voting} />}
        <Button
          intent="primary"
          className="mr3"
          disabled={!canShowVotes || !voting}
          outlined={!voting}
          onClick={onChangeStatus}
          large
        >
          Show votes
        </Button>
        <Button intent="primary" disabled={voting} outlined={voting} onClick={onChangeStatus} large>
          Reset
        </Button>
      </Callout>
      <div className="mx-auto max-width-4">
        <Observers users={observers} />
        <h2>Votes</h2>
        <Result users={voters} votes={votes} hidden={voting} />
      </div>
    </>
  )
}
