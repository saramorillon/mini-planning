import { Header } from '@src/ui/Header/Header'
import { render, screen } from '@testing-library/react'
import { router } from '@tests/wrappers'
import Cookies from 'js-cookie'
import React from 'react'

const getCookiesMock = Cookies.get as jest.Mock

describe('Header', () => {
  it('should not show greetings if no name in cookies', () => {
    getCookiesMock.mockReturnValue(null)
    render(<Header />, { wrapper: router })
    expect(screen.queryByText('Hello ')).not.toBeInTheDocument()
  })

  it('should show greetings if name in cookies', () => {
    getCookiesMock.mockReturnValue('Toto')
    render(<Header />, { wrapper: router })
    expect(screen.getByText('Hello Toto')).toBeInTheDocument()
  })
})
