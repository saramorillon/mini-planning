import { render, screen } from '@testing-library/react'
import React from 'react'
import { Header } from '../../../../../src/ui/components/Header/Header'
import { router } from '../../../../mocks'

describe('Header', () => {
  it('should render brand and logo', () => {
    render(<Header />, { wrapper: router })
    expect(screen.queryByText('Mini Planning')).toBeInTheDocument()
    expect(screen.queryByRole('img')).toHaveAttribute('src', '/favicon.svg')
  })
})
