const path = require('path')
const url = require('url')
const server = require('http').createServer()
const WSServer = require('ws').Server

const makeLogDriver = console =>
  msg$ =>
    msg$.subscribe(console.log)

const makeServerDriver = app =>
  sink$ => {
    app
      .get('*', (req, res) =>
        sink$.subscribe(sink =>
          res.sendFile(path.join(__dirname, sink))))
      // .listen(app.get('port'), () =>
      //   console.log(`listening on ${app.get('port')}...`))
    server.on('request', app)
    server.listen(3000, console.log('3000'))
  }

// const makeWSDriver = server => {
  const wss = WSServer({ server })

  // return sink$ => {
    wss.on('connection', ws => {
      var location = url.parse(ws.upgradeReq.url, true)

      ws.on('message', msg => {
        console.log(`received ${msg}`)

        ws.send(`received ${msg}!`)
      })

      ws.send('something')
    })
  // }
// }

module.exports = {
  makeLogDriver,
  makeServerDriver
}