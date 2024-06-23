import { render, screen } from '@testing-library/react'
import React from 'react'
import { Voters } from '../../../../src/ui/components/Voters.js'

describe('Voters', () => {
  it('should show users name', () => {
    const users = [
      { name: 'Toto', vote: '' },
      { name: 'Titi', vote: '' },
    ]
    render(<Voters users={users} hidden />)
    expect(screen.getByText('Toto')).toBeInTheDocument()
    expect(screen.getByText('Titi')).toBeInTheDocument()
  })

  it('should not show vote when user did not vote', () => {
    const users = [{ name: 'Toto', vote: '' }]
    render(<Voters users={users} hidden />)
    expect(screen.queryByText('✓')).not.toBeInTheDocument()
  })
})
