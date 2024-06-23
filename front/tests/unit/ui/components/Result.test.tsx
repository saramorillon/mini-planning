import { render, screen } from '@testing-library/react'
import React from 'react'
import { Result } from '../../../../src/ui/components/Result.js'

describe('Result', () => {
  it('should show users', () => {
    const users = [{ name: 'Toto', observer: false, vote: '' }]
    render(<Result users={users} votes={{ '': 1, total: 1 }} hidden />)
    expect(screen.getByText('Toto')).toBeInTheDocument()
  })

  it('should hide votes when hidden', () => {
    const users = [{ name: 'Toto', observer: false, vote: '0' }]
    render(<Result users={users} votes={{ '0': 1, total: 1 }} hidden />)
    expect(screen.getByText('✓')).toBeInTheDocument()
  })

  it('should hide chart when hidden', () => {
    const users = [{ name: 'Toto', observer: false, vote: '0' }]
    render(<Result users={users} votes={{ '0': 1, total: 1 }} hidden />)
    expect(screen.getAllByRole('progressbar')[0]).toHaveValue(0)
  })

  it('should show chart when not hidden', () => {
    const users = [{ name: 'Toto', observer: false, vote: '0' }]
    render(<Result users={users} votes={{ '0': 1, total: 1 }} hidden={false} />)
    expect(screen.getAllByRole('progressbar')[0]).toHaveValue(1)
  })
})
