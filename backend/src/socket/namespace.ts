import io from 'socket.io'

export class Namespace {
  private clients: Record<string, [string, string]> = {}

  constructor(private namespace: io.Namespace) {
    this.namespace.on('connection', (socket) => {
      socket.on('join', this.onJoin(socket))
      socket.on('vote', this.onVote(socket))
      socket.on('voting', this.onVoting())
      socket.on('disconnect', this.onDisconnect(socket))
    })
  }

  private onJoin(socket: io.Socket) {
    return (name: string) => {
      this.clients[socket.id] = [name, '']
      this.refresh()
    }
  }

  private onVote(socket: io.Socket) {
    return (vote: string) => {
      this.clients[socket.id][1] = vote
      this.refresh()
    }
  }

  private onVoting() {
    return (voting: boolean) => {
      this.namespace.emit('voting', voting)
      if (voting === true) {
        for (const socketId of Object.keys(this.clients)) {
          this.clients[socketId][1] = ''
        }
        this.refresh()
      }
    }
  }

  private onDisconnect(socket: io.Socket) {
    return () => {
      delete this.clients[socket.id]
      this.refresh()
    }
  }

  private refresh() {
    this.namespace.emit('refresh', Object.values(this.clients))
  }
}
