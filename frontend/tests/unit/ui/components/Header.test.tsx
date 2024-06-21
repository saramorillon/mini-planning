import { useCopy } from '@saramorillon/hooks'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Header } from '../../../../src/ui/components/Header.js'
import { mock, router } from '../../../mocks.js'

vi.mock('@saramorillon/hooks')

describe('Header', () => {
  beforeEach(() => {
    mock(useCopy).mockReturnValue([false, null, vi.fn()])
  })

  it('should render brand and logo', () => {
    render(<Header />, { wrapper: router() })
    expect(screen.getByText('Mini Planning')).toBeInTheDocument()
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

  it('should render copy button if copy is enabled', () => {
    mock(useCopy).mockReturnValue([true, null, vi.fn()])
    render(<Header />, { wrapper: router('/room/id?name=name&observer=false') })
    expect(screen.getByText('Copy invitation link')).toBeInTheDocument()
  })

  it('should copy url when clicking on button', () => {
    const copy = vi.fn()
    mock(useCopy).mockReturnValue([true, null, copy])
    render(<Header />, { wrapper: router('/room/id?name=name&observer=false') })
    fireEvent.click(screen.getByText('Copy invitation link'))
    expect(copy).toHaveBeenCalledWith('http://localhost:3000/room/id')
  })
})
