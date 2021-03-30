import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { SmallCard } from '../Card/Card'

interface IUsersProps {
  users: [string, string][]
  hidden: boolean
}

export function Users({ users, hidden }: IUsersProps): JSX.Element {
  return (
    <ListGroup>
      {users.map(([user, vote]) => (
        <ListGroupItem key={user}>
          {vote && (
            <SmallCard outline className="float-right">
              {hidden ? '✓' : vote}
            </SmallCard>
          )}
          <h5>{user}</h5>
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}
