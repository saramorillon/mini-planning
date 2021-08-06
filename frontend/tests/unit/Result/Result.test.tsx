import { Result } from '@src/ui/Result/Result'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Result', () => {
  it('should show users', () => {
    render(<Result users={{ Toto: '' }} votes={{ '': 1, total: 1 }} hidden />)
    expect(screen.getByText('Toto')).toBeInTheDocument()
  })

  it('should hide votes when hidden', () => {
    render(<Result users={{ Toto: '0' }} votes={{ '0': 1, total: 1 }} hidden />)
    expect(screen.getByText('✓')).toBeInTheDocument()
  })

  it('should hide chart when hidden', () => {
    render(<Result users={{ Toto: '0' }} votes={{ '0': 1, total: 1 }} hidden />)
    expect(screen.getByTestId('votebar-fg-0')).toHaveStyleRule('height', '0%')
  })

  it('should show chart when not hidden', () => {
    render(<Result users={{ Toto: '0' }} votes={{ '0': 1, total: 1 }} hidden={false} />)
    expect(screen.getByTestId('votebar-fg-0')).toHaveStyleRule('height', '100%')
  })
})
