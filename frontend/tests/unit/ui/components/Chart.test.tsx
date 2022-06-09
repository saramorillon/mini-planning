import { render, screen } from '@testing-library/react'
import React from 'react'
import { Chart } from '../../../../src/ui/components/Chart'

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
    expect(screen.getAllByRole('progressbar')[0]).toHaveAttribute('value', '0')
  })

  it('should show quantities when not hidden', () => {
    render(<Chart votes={{ total: 10, '0': 6, '1': 4 }} hidden={false} setHovered={jest.fn()} />)
    expect(screen.getAllByRole('progressbar')[0]).toHaveAttribute('value', '0.6')
    expect(screen.getAllByRole('progressbar')[1]).toHaveAttribute('value', '0.4')
    expect(screen.getByText('6 / 10')).toBeInTheDocument()
    expect(screen.getByText('4 / 10')).toBeInTheDocument()
  })
})
