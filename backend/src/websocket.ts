import { Server as SocketIOServer } from 'socket.io'

export const setupWebSocket = (io: SocketIOServer) => {
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`)

    // Handle lab sessions
    socket.on('join-lab', (labId: string) => {
      socket.join(`lab-${labId}`)
      console.log(`Client ${socket.id} joined lab ${labId}`)
    })

    socket.on('leave-lab', (labId: string) => {
      socket.leave(`lab-${labId}`)
      console.log(`Client ${socket.id} left lab ${labId}`)
    })

    // Handle Docker terminal interactions
    socket.on('terminal-input', (data: { labId: string; input: string }) => {
      // Broadcast to lab room
      socket.to(`lab-${data.labId}`).emit('terminal-output', {
        input: data.input,
        timestamp: new Date().toISOString()
      })
    })

    // Handle lab status updates
    socket.on('lab-status', (data: { labId: string; status: string }) => {
      socket.to(`lab-${data.labId}`).emit('lab-status-update', {
        labId: data.labId,
        status: data.status,
        timestamp: new Date().toISOString()
      })
    })

    // Handle chat/communication
    socket.on('lab-message', (data: { labId: string; message: string; user: string }) => {
      io.to(`lab-${data.labId}`).emit('lab-message', {
        message: data.message,
        user: data.user,
        timestamp: new Date().toISOString()
      })
    })

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`)
    })

    // Error handling
    socket.on('error', (error) => {
      console.error(`Socket error for ${socket.id}:`, error)
    })
  })

  return io
}
