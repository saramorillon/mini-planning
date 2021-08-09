import { NameForm } from '@src/ui/NameForm/NameForm'
import { fireEvent, render, screen } from '@testing-library/react'
import Fakerator from 'fakerator'
import Cookies from 'js-cookie'
import React from 'react'

const fakeratorMock = Fakerator as jest.Mock

describe('NameForm', () => {
  beforeEach(() => {
    fakeratorMock.mockReturnValue({ names: { firstName: jest.fn().mockReturnValue('Firstname') } })
  })

  it('should use a random name as input placeholder', () => {
    render(<NameForm />)
    expect(screen.getByPlaceholderText('Firstname')).toBeInTheDocument()
  })

  it('should set cookie when submitting form', () => {
    render(<NameForm />)
    fireEvent.change(screen.getByPlaceholderText('Firstname'), { target: { value: 'Toto' } })
    fireEvent.click(screen.getByLabelText('Observer'))
    fireEvent.click(screen.getByText('Send'))
    expect(Cookies.set).toHaveBeenCalledWith('user', '{"name":"Toto","observer":true}')
  })
})
