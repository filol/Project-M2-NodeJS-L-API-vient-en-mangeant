const app = require('./app')
const http = require('http')

const port = 3001 || process.env.port
app.set('port', port)
console.log('port: ', port)

/**
 * Function handling errors, checks and handles them appropriately - registered to the server
 * if syscall not about listen, just display error (syscall : string property describing the syscall that failed)
 * @param {*} error
 */
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
    default:
      throw error
  }
}

const server = http.createServer(app)

// Associates error handling with errorHandler function
server.on('error', errorHandler)

server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
  console.log('Listening on ' + bind)
})

server.listen(port)
