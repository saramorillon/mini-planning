import { Chart } from '@src/Chart/Chart'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Chart', () => {
  it('should show nothing when no users', () => {
    render(<Chart users={[]} hidden />)
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('should show card when users', () => {
    render(<Chart users={[{ name: 'Toto' }]} hidden />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should not show quantities when hidden', () => {
    render(<Chart users={[{ name: 'Toto', vote: '0' }]} hidden />)
    expect(screen.getByTestId('votebar-fg-0')).toHaveStyleRule('height', '0%')
  })

  it('should show quantities when not hidden', () => {
    render(<Chart users={[{ name: 'Toto', vote: '0' }]} hidden={false} />)
    expect(screen.getByTestId('votebar-fg-0')).toHaveStyleRule('height', '100%')
  })
})
