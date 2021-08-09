import { useUserContext } from '@src/contexts/UserContext'
import { Header } from '@src/ui/Header/Header'
import { render, screen } from '@testing-library/react'
import { router } from '@tests/wrappers'
import React from 'react'

jest.mock('@src/contexts/UserContext')

const useUserContextMock = useUserContext as jest.Mock

describe('Header', () => {
  it('should not show greetings if no name in cookies', () => {
    useUserContextMock.mockReturnValue(null)
    render(<Header />, { wrapper: router })
    expect(screen.queryByText('Hello ')).not.toBeInTheDocument()
  })

  it('should show greetings if name in cookies', () => {
    useUserContextMock.mockReturnValue({ name: 'Toto', observer: false })
    render(<Header />, { wrapper: router })
    expect(screen.getByText('Hello Toto')).toBeInTheDocument()
  })
})
