const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')

module.exports = express()
  .set('port', 3000)
  .use(require('webpack-dev-middleware')(webpack(config), {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  .get('/dist', express.static('dist'))
