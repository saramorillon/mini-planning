import React from 'react'
import { Button } from 'reactstrap'

interface IVoteButtonProps {
  onClick: (voting: boolean) => void
  voting: boolean
  disabled?: boolean
}

export function VoteButton({ onClick, voting, disabled }: IVoteButtonProps): JSX.Element {
  return (
    <>
      <Button
        color="primary"
        className="mr-3"
        disabled={disabled || !voting}
        outline={!voting}
        onClick={() => onClick(true)}
      >
        Show votes
      </Button>
      <Button color="primary" disabled={voting} outline={voting} onClick={() => onClick(false)}>
        Reset
      </Button>
    </>
  )
}
