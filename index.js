const {run} = require('@cycle/core')
const {Observable: {of}} = require('rx')

const app = require('./app')
const {makeServerDriver, makeLogDriver} = require('./drivers')

const main = () => ({
  server: of('./index.html')
})

run(main, {
  server: makeServerDriver(app),
  log: makeLogDriver(console)
})
