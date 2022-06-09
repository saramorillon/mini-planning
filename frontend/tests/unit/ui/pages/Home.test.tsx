import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { Home } from '../../../../src/ui/pages/Home'
import { mock } from '../../../mocks'

jest.mock('react-router-dom')

describe('Home', () => {
  it('should go to room page when clicking on button', () => {
    const navigate = jest.fn()
    mock(useNavigate).mockReturnValue(navigate)
    mock(v4).mockReturnValue('uuid')
    render(<Home />)
    fireEvent.click(screen.getByText('Create a room now'))
    expect(navigate).toHaveBeenCalledWith('/room/uuid')
  })
})
