import {Server} from 'http'
import copromise from 'mini-copromise'
import pify from 'pify'

const getHTTPServer = copromise(function * getHTTPServer (port) {
  const server = new Server()
  yield pify(server.listen.bind(server))(port)
  return server
})

export {getHTTPServer}