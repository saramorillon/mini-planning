import io from 'socket.io'
import { Namespace } from '@src/socket/namespace'

export function mockNamespace(config?: Partial<Namespace>): Namespace {
  return ({
    voting: false,
    clients: {},
    emit: jest.fn(),
    ...config,
  } as unknown) as Namespace
}

export function mockSocket(config?: Partial<io.Socket>): io.Socket {
  return ({
    id: 'id',
    on: jest.fn(),
    ...config,
  } as unknown) as io.Socket
}

export function mockIo(namespace?: string): io.Server {
  return ({
    _nsps: { has: jest.fn().mockReturnValue(!namespace) },
    of: jest.fn().mockReturnValue(namespace),
  } as unknown) as io.Server
}
