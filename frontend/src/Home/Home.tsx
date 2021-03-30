import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Container, Jumbotron } from 'reactstrap'
import { v4 } from 'uuid'

export function Home(): JSX.Element {
  return (
    <>
      <Jumbotron>
        <h1>Create a room</h1>
        <p className="lead">Create a room and send the invitation link to your team</p>
        <hr className="my-4" />
        <Button tag={NavLink} color="primary" size="lg" to={`/room/${v4()}`}>
          Create a room now
        </Button>
      </Jumbotron>
      <Container>
        <h1>How it works</h1>
        <ol>
          <li>Create a room</li>
          <li>Invite your team members</li>
          <li>Estimate stories</li>
        </ol>
      </Container>
    </>
  )
}
