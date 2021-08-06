import { Users } from '@src/ui/Users/Users'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Users', () => {
  it('should show users name', () => {
    render(<Users users={{ Toto: '', Titi: '' }} hidden />)
    expect(screen.getByText('Toto')).toBeInTheDocument()
    expect(screen.getByText('Titi')).toBeInTheDocument()
  })

  it('should not show vote when user did not vote', () => {
    render(<Users users={{ Toto: '' }} hidden />)
    expect(screen.queryByText('✓')).not.toBeInTheDocument()
  })

  it('should not show vote when hidden', () => {
    render(<Users users={{ Toto: '0' }} hidden />)
    expect(screen.getByText('✓')).toBeInTheDocument()
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('should show vote when not hidden', () => {
    render(<Users users={{ Toto: '0' }} hidden={false} />)
    expect(screen.queryByText('✓')).not.toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
