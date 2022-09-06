import { getMockReq, getMockRes } from '@jest-mock/express'
import express, { Response, static as staticDir } from 'express'
import helmet from 'helmet'
import { join } from 'path'
import { createApp, getApp, renderFile } from '../../src/app'
import { mock } from '../mocks'

jest.mock('express')
jest.mock('helmet')

function mockExpress() {
  const expressMock = { use: jest.fn(), get: jest.fn() }
  mock(express).mockReturnValue(expressMock)
  mock(staticDir).mockReturnValue('static')
  return expressMock
}

describe('createApp', () => {
  it('should create express app', () => {
    mockExpress()
    createApp()
    expect(express).toHaveBeenCalled()
  })

  it('should use static middleware', () => {
    const expressMock = mockExpress()
    createApp()
    expect(staticDir).toHaveBeenCalledWith('public-dir')
    expect(expressMock.use).toHaveBeenCalledWith('static')
  })

  it('should use helmet middleware', () => {
    mock(helmet).mockReturnValue('helmet')
    const expressMock = mockExpress()
    createApp()
    expect(helmet).toHaveBeenCalledWith({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
          fontSrc: ["'self'", 'https:'],
        },
      },
    })
    expect(expressMock.use).toHaveBeenCalledWith('helmet')
  })

  it('should create app route', () => {
    const expressMock = mockExpress()
    createApp()
    expect(expressMock.use).toHaveBeenCalledWith('/api/app', getApp)
  })

  it('should create static route', () => {
    const expressMock = mockExpress()
    createApp()
    expect(expressMock.get).toHaveBeenCalledWith('*', renderFile)
  })
})

describe('renderFile', () => {
  it('should send index.html file', () => {
    const { res } = getMockRes<Response>()
    renderFile(getMockReq(), res)
    expect(res.sendFile).toHaveBeenCalledWith(join('public-dir', 'index.html'))
  })
})

describe('getApp', () => {
  it('should send app info', () => {
    const { res } = getMockRes<Response>()
    getApp(getMockReq(), res)
    expect(res.json).toHaveBeenCalledWith({
      author: { name: 'Sara Morillon', url: 'https://saramorillon.com/' },
      name: 'mini-planning',
      repository: { url: 'https://github.com/saramorillon/mini-planning' },
      version: '1.2.1',
    })
  })
})
