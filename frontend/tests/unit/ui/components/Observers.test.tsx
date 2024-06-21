import { render, screen } from '@testing-library/react'
import React from 'react'
import { Observers } from '../../../../src/ui/components/Observers.js'

it('should not show observers if no observer is present', () => {
  render(<Observers users={[]} />)
  expect(screen.queryByText('Observers:')).not.toBeInTheDocument()
})

it('should show observers separated with a comma if observers are present', () => {
  const users = [
    { name: 'Tutu', observer: true, vote: '' },
    { name: 'Tata', observer: true, vote: '' },
  ]
  render(<Observers users={users} />)
  expect(screen.getByText('Observers: Tutu, Tata')).toBeInTheDocument()
})
