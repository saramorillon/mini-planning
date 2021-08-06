import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { SmallCard } from '../Card/Card'
import { User } from '@src/models/User'

interface IUsersProps {
  users: User[]
  hidden: boolean
}

export function Users({ users, hidden }: IUsersProps): JSX.Element {
  return (
    <ListGroup>
      {users.map(({ name, observer, vote }) => (
        <ListGroupItem key={name}>
          {(vote || observer) && (
            <SmallCard outline className="float-right">
              {observer ? '👁' : hidden ? '✓' : vote}
            </SmallCard>
          )}
          <h5>{name}</h5>
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}
