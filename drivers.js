const {Observable, Subject} = require('rx')

const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')
const path = require('path')
const url = require('url')
const server = require('http').createServer()
const WSServer = require('ws').Server

const makeLogDriver = console =>
  msg$ =>
    msg$.subscribe(console.log)

const makeServerHTTPDriver = server =>
  sink$ => {
    const app = express()
      .use(require('webpack-dev-middleware')(webpack(config), {
        noInfo: true,
        publicPath: config.output.publicPath
      }))
      .get('/dist', express.static('dist'))
      .get('*', (req, res) =>
        sink$.subscribe(sink =>
          res.sendFile(path.join(__dirname, sink))))

    server
      .on('request', app)
      .listen(3000, console.log('listening on 3000...'))
  }

const makeWebSocketServerDriver = server => {
  const wss = WSServer({ server })

  const tmp$ = new Subject()

  return sink$ => {
    wss.on('connection', ws => {
      ws.on('message', msg =>
        tmp$.onNext(msg))

      sink$.subscribe(sink =>
        ws.send(sink))
    })

    return tmp$
  }
}

module.exports = {
  server,
  makeLogDriver,
  makeServerHTTPDriver,
  makeWebSocketServerDriver
}