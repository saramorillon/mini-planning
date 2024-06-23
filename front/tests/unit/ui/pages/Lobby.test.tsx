import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useUser } from '../../../../src/hooks/useUser.js'
import { Lobby } from '../../../../src/ui/pages/Lobby.js'
import { mock, mockNavigate } from '../../../mocks.js'

vi.mock('react-router-dom')
vi.mock('../../../../src/hooks/useUser.js')
vi.mock('../../../../src/ui/pages/Room.js', () => ({
  Room: function Room() {
    return <div>Room mock</div>
  },
}))

describe('Lobby', () => {
  beforeEach(() => {
    mock(useLocation).mockReturnValue({ pathname: 'pathname' })
    mock(useUser).mockReturnValue(null)
  })

  it('should render form if user is not registered', () => {
    render(<Lobby />)
    expect(screen.getByText('Enter room')).toBeInTheDocument()
    expect(screen.queryByText('Room mock')).not.toBeInTheDocument()
  })

  it('should render room if user is registered', () => {
    mock(useUser).mockReturnValue({ name: 'Toto', observer: false })
    render(<Lobby />)
    expect(screen.queryByText('Enter room')).not.toBeInTheDocument()
    expect(screen.getByText('Room mock')).toBeInTheDocument()
  })

  it('should register user when submitting form', () => {
    const navigate = mockNavigate()
    render(<Lobby />)
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'Toto' } })
    fireEvent.click(screen.getByLabelText('Observer'))
    fireEvent.click(screen.getByText('Enter room'))
    expect(navigate).toHaveBeenCalledWith('pathname?name=Toto&observer=true')
  })
})
