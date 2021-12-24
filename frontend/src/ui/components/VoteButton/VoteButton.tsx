import { Button } from '@blueprintjs/core'
import React from 'react'

interface IVoteButtonProps {
  onClick: (voting: boolean) => void
  voting: boolean
  disabled?: boolean
}

export function VoteButton({ onClick, voting, disabled }: IVoteButtonProps): JSX.Element {
  return (
    <>
      <Button
        intent="primary"
        className="mr3"
        disabled={disabled || !voting}
        outlined={!voting}
        onClick={() => onClick(true)}
        large
      >
        Show votes
      </Button>
      <Button intent="primary" disabled={voting} outlined={voting} onClick={() => onClick(false)} large>
        Reset
      </Button>
    </>
  )
}
