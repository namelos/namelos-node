const path = require('path')

const makeLogDriver = console =>
  msg$ =>
    msg$.subscribe(console.log)

const makeServerDriver = app =>
  sink$ =>
    app
      .get('*', (req, res) =>
        sink$.subscribe(sink =>
          res.sendFile(path.join(__dirname, sink))))
      .listen(app.get('port'), () =>
        console.log(`listening on ${app.get('port')}...`))

module.exports = {
  makeLogDriver,
  makeServerDriver
}