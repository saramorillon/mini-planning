import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { VoteBar } from '../../../../../src/ui/components/VoteBar/VoteBar'

describe('VoteBar', () => {
  it('should set hovered when hovering card', () => {
    const setHovered = jest.fn()
    render(<VoteBar card="0" max={1} setHovered={setHovered} />)
    fireEvent.mouseEnter(screen.getByText('0'))
    expect(setHovered).toHaveBeenCalledWith('0')
    fireEvent.mouseLeave(screen.getByText('0'))
    expect(setHovered).toHaveBeenCalledWith(undefined)
  })

  it('should set hovered when cliking card', () => {
    const setHovered = jest.fn()
    render(<VoteBar card="0" max={1} setHovered={setHovered} />)
    fireEvent.click(screen.getByText('0'))
    expect(setHovered).toHaveBeenCalledWith('0')
  })
})
