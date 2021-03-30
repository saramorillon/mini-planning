import { io } from '../app'

export function initNamespace(namespace: string): void {
  const np = io.of(namespace)
  const clients: Record<string, [string, string]> = {}

  function refresh() {
    np.emit('refresh', Object.values(clients))
  }

  np.on('connection', (socket) => {
    socket.on('join', (name) => {
      clients[socket.id] = [name, '']
      refresh()
    })

    socket.on('vote', (vote) => {
      clients[socket.id][1] = vote
      refresh()
    })

    socket.on('voting', (voting) => {
      np.emit('voting', voting)
      if (voting === true) {
        for (const key of Object.keys(clients)) {
          clients[key][1] = ''
        }
        refresh()
      }
    })

    socket.on('disconnect', () => {
      delete clients[socket.id]
      refresh()
    })
  })
}
