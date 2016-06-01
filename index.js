const {run} = require('@cycle/core')
const {Observable: {of}} = require('rx')

const {
  makeServerHTTPDriver, makeLogDriver, makeWebSocketServerDriver,
  app, server
} = require('./drivers')

const main = ({ ws }) => ({
  server: of('./index.html'),
  ws: ws.map(ws => `a: ${ws}`),
  log: ws
})

run(main, {
  server: makeServerHTTPDriver(server),
  log: makeLogDriver(console),
  ws: makeWebSocketServerDriver(server)
})
