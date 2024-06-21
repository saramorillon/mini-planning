import React from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

export function Home(): JSX.Element {
  const navigate = useNavigate()

  return (
    <>
      <header>
        <h1>Create a room</h1>
        <p>Create a room and send the invitation link to your team</p>
      </header>
      <main className="mx-auto max-width-3">
        <button type="button" data-variant="primary" onClick={() => navigate(`/room/${v4()}`)}>
          Create a room now
        </button>
        <hr />
        <h1>How it works</h1>
        <ol>
          <li>Create a room</li>
          <li>Invite your team members</li>
          <li>Estimate stories</li>
        </ol>
      </main>
    </>
  )
}
