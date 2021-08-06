import React from 'react'
import { Button } from 'reactstrap'

export function VoteButton({ onClick, voting }: { onClick: (voting: boolean) => void; voting: boolean }): JSX.Element {
  return (
    <>
      <Button color="primary" className="mr-3" disabled={!voting} outline={!voting} onClick={() => onClick(true)}>
        Show votes
      </Button>
      <Button color="primary" disabled={voting} outline={voting} onClick={() => onClick(false)}>
        Reset
      </Button>
    </>
  )
}
