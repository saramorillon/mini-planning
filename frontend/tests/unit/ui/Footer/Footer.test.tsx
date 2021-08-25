import { getVersion } from '@src/services/version'
import { Footer } from '@src/ui/Footer/Footer'
import { render, screen } from '@testing-library/react'
import { renderAsync } from '@tests/utils'
import { router } from '@tests/wrappers'
import mockdate from 'mockdate'
import React from 'react'

jest.mock('@src/services/version')

mockdate.set('2021-01-01T01:00:00.000Z')

const getVersionMock = getVersion as jest.Mock

describe('Footer', () => {
  it('should show version number and current year', async () => {
    getVersionMock.mockResolvedValue('1.0.0')
    await renderAsync(<Footer />, { wrapper: router })
    expect(screen.getByText('v1.0.0 © Sara Morillon 2021')).toBeInTheDocument()
  })
})
