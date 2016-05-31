const express = require('express')
const { run } = require('@cycle/core')
const { Observable, Subject } = require('rx')
const { of } = Observable

const makeLogDriver = () =>
  msg$ =>
    msg$.subscribe(console.log)

const makeServerDriver = port =>
  sink$ =>
    express()
      .get('/', (req, res) =>
        sink$.subscribe(sink =>
          res.send(sink)))
      .listen(port, () =>
        console.log(`listening on ${port}...`))

const main = () => ({
  server: of('hello')
})

run(main, {
  server: makeServerDriver(3000),
  log: makeLogDriver()
})
