import { EventEmitter } from 'events'
import { Request, Response } from 'express'
import { Namespace, Socket } from 'socket.io'
import { Mock } from 'vitest'

export function mock(fn: unknown): Mock {
  return fn as Mock
}

export function mockNamespace(): Namespace {
  const emitter = new EventEmitter()
  vi.spyOn(emitter, 'on')
  vi.spyOn(emitter, 'emit')
  Object.defineProperty(emitter, 'name', { value: '/namespace' })
  return emitter as Namespace
}

export function mockSocket(): Socket {
  const emitter = new EventEmitter()
  vi.spyOn(emitter, 'on')
  vi.spyOn(emitter, 'emit')
  Object.defineProperty(emitter, 'id', { value: 'socket-id' })
  Object.defineProperty(emitter, 'nsp', { value: mockNamespace() })
  return emitter as Socket
}

export function mockReq(req: Partial<Request> = {}): Request {
  return {
    method: 'GET',
    url: '/',
    headers: { host: 'localhost' },
    socket: {},
    ...req,
  } as never
}

export function mockRes(res: Partial<Response> = {}): Response {
  return {
    sendFile: vi.fn(),
    json: vi.fn(),
    ...res,
  } as never
}
