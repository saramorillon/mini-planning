import { fireEvent, render, screen } from '@testing-library/react'
import axios from 'axios'
import { EventEmitter } from 'events'
import Fakerator from 'fakerator'
import Cookies from 'js-cookie'
import React from 'react'
import io from 'socket.io-client'
import { useUserContext } from '../../../../../src/contexts/UserContext'
import { Lobby } from '../../../../../src/ui/pages/Lobby/Lobby'
import { router } from '../../../../mocks'

jest.mock('../../../../../src/contexts/UserContext')

const useUserContextMock = useUserContext as jest.Mock
const fakeratorMock = Fakerator as jest.Mock
const axiosPostMock = axios.post as jest.Mock
const ioMock = io as unknown as jest.Mock

describe('Lobby', () => {
  beforeEach(() => {
    fakeratorMock.mockReturnValue({ names: { firstName: jest.fn().mockReturnValue('Firstname') } })
    useUserContextMock.mockReturnValue(null)
    fakeratorMock.mockReturnValue({ names: { firstName: jest.fn().mockReturnValue('Firstname') } })
    axiosPostMock.mockResolvedValue(undefined)
    ioMock.mockReturnValue(new EventEmitter())
  })

  it('should render name form if no user in cookies', () => {
    render(<Lobby />, { wrapper: router })
    expect(screen.getByText("What's your name?")).toBeInTheDocument()
    expect(screen.queryByText('Choose a card')).not.toBeInTheDocument()
  })

  it('should render room if user in cookies', () => {
    useUserContextMock.mockReturnValue({ name: 'Toto', observer: false })
    render(<Lobby />, { wrapper: router })
    expect(screen.queryByText("What's your name?")).not.toBeInTheDocument()
    expect(screen.getByText('Choose a card')).toBeInTheDocument()
  })

  it('should use a random name as input placeholder', () => {
    render(<Lobby />)
    expect(screen.getByPlaceholderText('Firstname')).toBeInTheDocument()
  })

  it('should set cookie when submitting form', () => {
    render(<Lobby />)
    fireEvent.change(screen.getByPlaceholderText('Firstname'), { target: { value: 'Toto' } })
    fireEvent.click(screen.getByLabelText('Observer'))
    fireEvent.click(screen.getByText('Enter room'))
    expect(Cookies.set).toHaveBeenCalledWith('user', '{"name":"Toto","observer":true}')
  })
})
