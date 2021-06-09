import { Lobby } from '@src/Lobby/Lobby'
import { fireEvent, render, screen } from '@testing-library/react'
import { router } from '@tests/wrappers'
import axios from 'axios'
import Fakerator from 'fakerator'
import Cookies from 'js-cookie'
import React from 'react'
import io from 'socket.io-client'
import { EventEmitter } from 'events'

const getCookiesMock = Cookies.get as jest.Mock
const fakeratorMock = Fakerator as jest.Mock
const axiosPostMock = axios.post as jest.Mock
const ioMock = (io as unknown) as jest.Mock

describe('Lobby', () => {
  beforeEach(() => {
    getCookiesMock.mockReturnValue(null)
    fakeratorMock.mockReturnValue({ names: { firstName: jest.fn().mockReturnValue('Firstname') } })
    axiosPostMock.mockResolvedValue(undefined)
    ioMock.mockReturnValue(new EventEmitter())
  })

  it('should render name form if no name in cookies', () => {
    render(<Lobby />, { wrapper: router })
    expect(screen.getByText("What's your name?")).toBeInTheDocument()
    expect(screen.queryByText('Choose a card')).not.toBeInTheDocument()
  })

  it('should set name in cookie', () => {
    render(<Lobby />, { wrapper: router })
    fireEvent.change(screen.getByPlaceholderText('Firstname'), { target: { value: 'Toto' } })
    fireEvent.click(screen.getByText('Send'))
    expect(Cookies.set).toHaveBeenCalledWith('name', 'Toto')
  })

  it('should render room if name in cookies', () => {
    getCookiesMock.mockReturnValue('Toto')
    render(<Lobby />, { wrapper: router })
    expect(screen.queryByText("What's your name?")).not.toBeInTheDocument()
    expect(screen.getByText('Choose a card')).toBeInTheDocument()
  })
})
