import http from 'http'
import io, { Namespace } from 'socket.io'
import { Room } from './room'

export class IoService {
  static io: io.Server

  static init(server: http.Server): void {
    this.io = new io.Server(server, { transports: ['polling'] })
  }

  static initRoom(namespace: string): void {
    if (!this.io._nsps.has(namespace)) {
      new Room(namespace)
    }
  }

  static createNamespace(namespace: string): Namespace {
    return this.io.of(namespace)
  }
}
