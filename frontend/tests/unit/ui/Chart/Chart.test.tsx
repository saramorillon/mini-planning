import { Chart } from '@src/ui/Chart/Chart'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

describe('Chart', () => {
  it('should show nothing when no votes', () => {
    render(<Chart votes={{ total: 0 }} hidden setHovered={jest.fn()} />)
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('should show card when votes', () => {
    render(<Chart votes={{ total: 1, '0': 1 }} hidden setHovered={jest.fn()} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should not show quantities when hidden', () => {
    render(<Chart votes={{ total: 1, '0': 1 }} hidden setHovered={jest.fn()} />)
    expect(screen.getByTestId('votebar-fg-0')).toHaveStyleRule('height', '0%')
  })

  it('should show quantities when not hidden', () => {
    render(<Chart votes={{ total: 10, '0': 6, '1': 4 }} hidden={false} setHovered={jest.fn()} />)
    expect(screen.getByTestId('votebar-fg-0')).toHaveStyleRule('height', '60%')
    expect(screen.getByTestId('votebar-fg-1')).toHaveStyleRule('height', '40%')
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('should set hovered when hovering card', () => {
    const setHovered = jest.fn()
    render(<Chart votes={{ total: 10, '0': 6, '1': 4 }} hidden={false} setHovered={setHovered} />)
    fireEvent.mouseEnter(screen.getByTestId('votebar-fg-0'))
    expect(setHovered).toHaveBeenCalledWith('0')
    fireEvent.mouseLeave(screen.getByTestId('votebar-fg-0'))
    expect(setHovered).toHaveBeenCalledWith(undefined)
  })
})
