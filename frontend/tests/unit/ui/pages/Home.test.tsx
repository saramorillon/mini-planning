import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { v4 } from 'uuid'
import { Home } from '../../../../src/ui/pages/Home.js'
import { mock, mockNavigate } from '../../../mocks.js'

vi.mock('react-router-dom')

describe('Home', () => {
  it('should go to room page when clicking on button', () => {
    mock(v4).mockReturnValue('uuid')
    const navigate = mockNavigate()
    render(<Home />)
    fireEvent.click(screen.getByText('Create a room now'))
    expect(navigate).toHaveBeenCalledWith('/room/uuid')
  })
})
