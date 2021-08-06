import { Home } from '@src/ui/Home/Home'
import { render, screen } from '@testing-library/react'
import { router } from '@tests/wrappers'
import React from 'react'
import { v4 } from 'uuid'

const uuidMock = v4 as jest.Mock

describe('Home', () => {
  it('should render link to new room', () => {
    uuidMock.mockReturnValue('uuid')
    render(<Home />, { wrapper: router })
    expect(screen.getByText('Create a room now')).toHaveAttribute('href', '/room/uuid')
  })
})
