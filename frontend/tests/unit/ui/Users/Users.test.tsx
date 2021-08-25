import { Users } from '@src/ui/Users/Users'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Users', () => {
  it('should show users name', () => {
    const users = [
      { name: 'Toto', observer: false, vote: '' },
      { name: 'Titi', observer: false, vote: '' },
    ]
    render(<Users users={users} hidden />)
    expect(screen.getByText('Toto')).toBeInTheDocument()
    expect(screen.getByText('Titi')).toBeInTheDocument()
  })

  it('should not show vote when user did not vote', () => {
    const users = [{ name: 'Toto', observer: false, vote: '' }]
    render(<Users users={users} hidden />)
    expect(screen.queryByText('✓')).not.toBeInTheDocument()
  })

  it('should not show vote when hidden', () => {
    const users = [{ name: 'Toto', observer: false, vote: '0' }]
    render(<Users users={users} hidden />)
    expect(screen.getByText('✓')).toBeInTheDocument()
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('should show vote when not hidden', () => {
    const users = [{ name: 'Toto', observer: false, vote: '0' }]
    render(<Users users={users} hidden={false} />)
    expect(screen.queryByText('✓')).not.toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should not show an eye when observer', () => {
    const users = [{ name: 'Toto', observer: true, vote: '0' }]
    render(<Users users={users} hidden />)
    expect(screen.getByText('👀')).toBeInTheDocument()
  })
})
