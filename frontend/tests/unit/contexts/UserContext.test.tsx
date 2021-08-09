import { UserProvider, useUserContext } from '@src/contexts/UserContext'
import { render, screen } from '@testing-library/react'
import React from 'react'

function MockComponent() {
  const cookie = useUserContext()
  return <div data-testid="mock-component">{cookie?.name}</div>
}

describe('UserProvider', () => {
  it('should not provide user if not present in context', () => {
    jest.spyOn(React, 'useContext').mockReturnValue(null)
    render(<UserProvider children={<MockComponent />} />)
    expect(screen.getByTestId('mock-component')).toBeEmptyDOMElement()
  })

  it('should provide user if present in context', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({ name: 'Toto', observer: false })
    render(<UserProvider children={<MockComponent />} />)
    expect(screen.getByText('Toto')).toBeInTheDocument()
  })
})
