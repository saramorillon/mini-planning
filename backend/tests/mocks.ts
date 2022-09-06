import { EventEmitter } from 'events'
import { Namespace, Socket } from 'socket.io'

export function mock(fn: unknown): jest.Mock {
  return fn as jest.Mock
}

export function mockNamespace(): Namespace {
  const emitter = new EventEmitter()
  jest.spyOn(emitter, 'on')
  jest.spyOn(emitter, 'emit')
  Object.defineProperty(emitter, 'name', { value: '/namespace' })
  return emitter as Namespace
}

export function mockSocket(): Socket {
  const emitter = new EventEmitter()
  jest.spyOn(emitter, 'on')
  jest.spyOn(emitter, 'emit')
  Object.defineProperty(emitter, 'id', { value: 'socket-id' })
  Object.defineProperty(emitter, 'nsp', { value: mockNamespace() })
  return emitter as Socket
}
