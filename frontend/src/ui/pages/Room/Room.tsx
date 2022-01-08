import { Button, Callout } from '@blueprintjs/core'
import React, { useMemo } from 'react'
import { useRoomSocket } from '../../../hooks/useRoomSocket'
import { User } from '../../../models/User'
import { getVotes } from '../../../utils/getVotes'
import { Cards } from '../../components/Cards/Cards'
import { Result } from '../../components/Result/Result'

interface IRoomProps {
  user: Omit<User, 'vote'>
}

export function Room({ user }: IRoomProps): JSX.Element {
  const { users, voting, vote, canShowVotes, onVote, onChangeStatus } = useRoomSocket(user)
  const votes = useMemo(() => getVotes(users), [users])

  return (
    <>
      <Callout className="p4 center">
        <h1>Choose a card</h1>
        <Cards vote={vote} onVote={onVote} active={voting && !user.observer} />
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
        <h2>Votes</h2>
        <Result users={users} votes={votes} hidden={voting} />
      </div>
    </>
  )
}
