import { useCopy } from '@saramorillon/hooks'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Header } from '../../../../../src/ui/components/Header/Header'
import { mock, router } from '../../../../mocks'

jest.mock('@saramorillon/hooks')

describe('Header', () => {
  beforeEach(() => {
    mock(useCopy).mockReturnValue([false, null, jest.fn()])
  })

  it('should render brand and logo', () => {
    render(<Header />, { wrapper: router() })
    expect(screen.queryByText('Mini Planning')).toBeInTheDocument()
    expect(screen.queryByRole('img')).toHaveAttribute('src', '/favicon.svg')
  })

  it('should not render copy button if not on room page', () => {
    render(<Header />, { wrapper: router() })
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should not render copy button if copy is not enabled', () => {
    render(<Header />, { wrapper: router('/room/id?name=name&observer=false') })
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should render copy button if on room page and copy is enabled', () => {
    mock(useCopy).mockReturnValue([true, null, jest.fn()])
    render(<Header />, { wrapper: router('/room/id?name=name&observer=false') })
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should render url if on room page and copy is enabled', () => {
    mock(useCopy).mockReturnValue([true, null, jest.fn()])
    render(<Header />, { wrapper: router('/room/id?name=name&observer=false') })
    expect(screen.getByDisplayValue('http://localhost/room/id')).toBeInTheDocument()
  })

  it('should copy url when clicking on button', () => {
    const copy = jest.fn()
    mock(useCopy).mockReturnValue([true, null, copy])
    render(<Header />, { wrapper: router('/room/id?name=name&observer=false') })
    fireEvent.click(screen.getByRole('button'))
    expect(copy).toHaveBeenCalledWith('http://localhost/room/id')
  })
})
