import { Router } from 'express'
import { getApp } from '../../src/controllers/app/getApp'
import { postRoom } from '../../src/controllers/room/postRoom'
import { router } from '../../src/router'
import { mock } from '../mocks'

jest.mock('express')
jest.mock('../../src/controllers/app/getApp')
jest.mock('../../src/controllers/room/postRoom')

function mockRouter() {
  const routerMock = { get: jest.fn(), post: jest.fn() }
  mock(Router).mockReturnValue(routerMock)
  return routerMock
}

describe('router', () => {
  it('should create router', () => {
    mockRouter()
    router()
    expect(Router).toHaveBeenCalled()
  })

  it('should register app route', () => {
    const routerMock = mockRouter()
    router()
    expect(routerMock.get).toHaveBeenCalledWith('/app', getApp)
  })

  it('should register room route', () => {
    const routerMock = mockRouter()
    router()
    expect(routerMock.post).toHaveBeenCalledWith('/room', postRoom)
  })

  it('should return router', () => {
    const routerMock = mockRouter()
    const result = router()
    expect(result).toBe(routerMock)
  })
})
