import { useFetch } from '@saramorillon/hooks'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Footer } from '../../../../../src/ui/components/Footer/Footer'
import { IInfoProps } from '../../../../../src/ui/components/Info/Info'
import { mock } from '../../../../mocks'

jest.mock('@saramorillon/hooks')
jest.mock('../../../../../src/ui/components/Info/Info', () => ({
  Info: ({ open, toggle }: IInfoProps) => (open ? <button onClick={toggle}>Info</button> : null),
}))

describe('Footer', () => {
  beforeEach(() => {
    mock(useFetch).mockReturnValue([])
  })

  it('should render nothing if no app information', () => {
    const { container } = render(<Footer />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render app name', () => {
    mock(useFetch).mockReturnValue([{ name: 'app' }])
    render(<Footer />)
    expect(screen.getByText('app')).toBeInTheDocument()
  })

  it('should render app version', () => {
    mock(useFetch).mockReturnValue([{ version: 'version' }])
    render(<Footer />)
    expect(screen.getByText('vversion')).toBeInTheDocument()
  })

  it('should not render info', () => {
    mock(useFetch).mockReturnValue([{ version: 'version' }])
    render(<Footer />)
    expect(screen.queryByText('Info')).not.toBeInTheDocument()
  })

  it('should render info when clicking on info button', () => {
    mock(useFetch).mockReturnValue([{ version: 'version' }])
    render(<Footer />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Info')).toBeInTheDocument()
  })

  it('should hide info when toggling info', () => {
    mock(useFetch).mockReturnValue([{ version: 'version' }])
    render(<Footer />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Info')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Info'))
    expect(screen.queryByText('Info')).not.toBeInTheDocument()
  })
})
