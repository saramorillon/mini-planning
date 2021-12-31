import { EventEmitter } from 'events'
import io from 'socket.io'
import { Namespace, User } from '../src/socket/namespace'

export function mock(fn: unknown): jest.Mock {
  return fn as jest.Mock
}

export function mockNamespace(clients: Record<string, User> = {}): Namespace {
  const namespaceMock = new Namespace(mockIoNamespace())
  jest.spyOn(namespaceMock, 'kickUser')
  jest.spyOn(namespaceMock, 'emit')
  namespaceMock.voting = false
  namespaceMock['clients'] = clients
  return namespaceMock
}

export function mockIoNamespace(entries?: [string, io.Socket][]): io.Namespace {
  const emitter = new EventEmitter()
  Object.defineProperty(emitter, 'sockets', { value: new Map(entries) })
  return emitter as io.Namespace
}

export function mockIoSocket(config?: Partial<io.Socket>): io.Socket {
  return {
    id: 'id',
    on: jest.fn(),
    disconnect: jest.fn(),
    ...config,
  } as io.Socket
}

export function mockIo(namespace?: string): io.Server {
  return ({
    _nsps: { has: jest.fn().mockReturnValue(!namespace) },
    of: jest.fn().mockReturnValue(namespace),
  } as unknown) as io.Server
}

export function mockUser(config?: Partial<User>): User {
  return {
    name: 'name',
    observer: false,
    vote: '',
    ...config,
  }
}
