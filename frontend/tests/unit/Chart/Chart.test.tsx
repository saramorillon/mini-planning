import { Chart } from '@src/Chart/Chart'
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
    render(<Chart votes={{ total: 1, '0': 1 }} hidden={false} />)
    expect(screen.getByTestId('votebar-fg-0')).toHaveStyleRule('height', '100%')
  })
})
