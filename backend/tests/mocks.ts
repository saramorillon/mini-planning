import { EventEmitter } from 'events'
import { Namespace, Socket } from 'socket.io'
import { User } from '../src/socket/room'

export function mock(fn: unknown): jest.Mock {
  return fn as jest.Mock
}

export function mockNamespace(): Namespace {
  const emitter = new EventEmitter()
  jest.spyOn(emitter, 'on')
  jest.spyOn(emitter, 'emit')
  Object.defineProperty(emitter, 'name', { value: '/test' })
  return emitter as Namespace
}

export function mockSocket(): Socket {
  const emitter = new EventEmitter()
  jest.spyOn(emitter, 'on')
  jest.spyOn(emitter, 'emit')
  Object.defineProperty(emitter, 'id', { value: 'id' })
  return emitter as Socket
}

export function mockUser(config?: Partial<User>): User {
  return { name: 'name', observer: false, vote: '', ...config }
}
