const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')

const server = require('http').createServer()
const WSServer = require('ws').Server
const wss = new WSServer({ server })

module.exports = express()
  .set('port', 3000)
  .use(require('webpack-dev-middleware')(webpack(config), {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  .get('/dist', express.static('dist'))
