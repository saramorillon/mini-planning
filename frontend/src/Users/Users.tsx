import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { SmallCard } from '../Card/Card'

interface IUsersProps {
  users: { name: string; vote?: string }[]
  hidden: boolean
}

export function Users({ users, hidden }: IUsersProps): JSX.Element {
  return (
    <ListGroup>
      {users.map(({ name, vote }) => (
        <ListGroupItem key={name}>
          {vote && (
            <SmallCard outline className="float-right">
              {hidden ? '✓' : vote}
            </SmallCard>
          )}
          <h5>{name}</h5>
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}
