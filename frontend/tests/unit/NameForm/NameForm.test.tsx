import { NameForm } from '@src/NameForm/NameForm'
import { fireEvent, render, screen } from '@testing-library/react'
import Fakerator from 'fakerator'
import React from 'react'

const fakeratorMock = Fakerator as jest.Mock

describe('NameForm', () => {
  beforeEach(() => {
    fakeratorMock.mockReturnValue({ names: { firstName: jest.fn().mockReturnValue('Firstname') } })
  })

  it('should use a random name as input placeholder', () => {
    render(<NameForm value="" onChange={jest.fn()} />)
    expect(screen.getByPlaceholderText('Firstname')).toBeInTheDocument()
  })

  it('should set name in input', () => {
    render(<NameForm value="Toto" onChange={jest.fn()} />)
    expect(screen.getByPlaceholderText('Firstname')).toHaveValue('Toto')
  })

  it('should call onChange when submitting name', () => {
    const onChange = jest.fn()
    render(<NameForm value="" onChange={onChange} />)
    fireEvent.change(screen.getByPlaceholderText('Firstname'), { target: { value: 'Toto' } })
    fireEvent.click(screen.getByText('Send'))
    expect(onChange).toHaveBeenCalledWith('Toto')
  })
})
