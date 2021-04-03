import http from 'http'
import io from 'socket.io'
import { Namespace } from './namespace'

export class IoService {
  static io: io.Server

  static init(server: http.Server): void {
    this.io = new io.Server(server)
  }

  static initNamespace(namespace: string): void {
    if (!this.io._nsps.has(namespace)) {
      new Namespace(IoService.io.of(namespace))
    }
  }
}
