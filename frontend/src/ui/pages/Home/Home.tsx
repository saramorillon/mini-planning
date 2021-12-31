import { Button, Callout, Divider } from '@blueprintjs/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

export function Home(): JSX.Element {
  const navigate = useNavigate()

  return (
    <>
      <Callout className="p4">
        <h1>Create a room</h1>
        <p>Create a room and send the invitation link to your team</p>
        <Divider />
        <Button large onClick={() => navigate(`/room/${v4()}`)}>
          Create a room now
        </Button>
      </Callout>
      <div className="mx-auto max-width-3">
        <h1>How it works</h1>
        <ol>
          <li>Create a room</li>
          <li>Invite your team members</li>
          <li>Estimate stories</li>
        </ol>
      </div>
    </>
  )
}
