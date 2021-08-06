import { Chart } from '@src/ui/Chart/Chart'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Chart', () => {
  it('should show nothing when no votes', () => {
    render(<Chart votes={{ total: 0 }} hidden />)
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('should show card when votes', () => {
    render(<Chart votes={{ total: 1, '0': 1 }} hidden />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should not show quantities when hidden', () => {
    render(<Chart votes={{ total: 1, '0': 1 }} hidden />)
    expect(screen.getByTestId('votebar-fg-0')).toHaveStyleRule('height', '0%')
  })

  it('should show quantities when not hidden', () => {
    render(<Chart votes={{ total: 10, '0': 6, '1': 4 }} hidden={false} />)
    expect(screen.getByTestId('votebar-fg-0')).toHaveStyleRule('height', '60%')
    expect(screen.getByTestId('votebar-fg-1')).toHaveStyleRule('height', '40%')
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })
})
