import { render, screen } from '@testing-library/react'
import mockdate from 'mockdate'
import React from 'react'
import type { IApp } from '../../../../src/models/App.js'
import { getApp } from '../../../../src/services/app.js'
import { Footer } from '../../../../src/ui/components/Footer.js'
import { mock, wait } from '../../../mocks.js'

vi.mock('../../../../src/services/app.js')

mockdate.set('2022')

const appMock: IApp = {
  name: 'name',
  version: 'version',
  author: {
    name: 'author name',
    url: 'author url',
  },
  repository: {
    url: 'repository url',
  },
}

describe('Footer', () => {
  beforeEach(() => {
    mock(getApp).mockResolvedValue(appMock)
  })

  it('should render nothing if no app information', async () => {
    mock(getApp).mockResolvedValue(null)
    const { container } = render(<Footer />)
    await wait()
    expect(container).toBeEmptyDOMElement()
  })

  it('should render app name', async () => {
    render(<Footer />)
    await wait()
    expect(screen.getByText('name')).toBeInTheDocument()
  })

  it('should render app version', async () => {
    render(<Footer />)
    await wait()
    expect(screen.getByText('vversion')).toBeInTheDocument()
  })

  it('should render repository url', async () => {
    render(<Footer />)
    await wait()
    expect(screen.getByText('repository url')).toHaveAttribute('href', 'repository url')
  })

  it('should render author url', async () => {
    render(<Footer />)
    await wait()
    expect(screen.getByText('author url')).toHaveAttribute('href', 'author url')
  })

  it('should render author name and current year', async () => {
    render(<Footer />)
    await wait()
    expect(screen.getByText('© author name 2022')).toBeInTheDocument()
  })
})
