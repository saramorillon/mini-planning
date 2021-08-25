import { EventEmitter } from 'events'
import io from 'socket.io'
import { Namespace, User } from '@src/socket/namespace'

export function mockNamespace(config?: Partial<Namespace>): Namespace {
  return ({
    voting: false,
    clients: {},
    emit: jest.fn(),
    disconnectSocket: jest.fn(),
    findClient: jest.fn(),
    ...config,
  } as unknown) as Namespace
}

export function mockIoNamespace(config?: Partial<io.Namespace>): io.Namespace {
  const eventEmitter = new EventEmitter()
  if (config) {
    for (const key of Object.keys(config)) {
      eventEmitter[key] = config[key]
    }
  }
  eventEmitter['sockets'] = new Map()
  return eventEmitter as io.Namespace
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
  } as User
}
