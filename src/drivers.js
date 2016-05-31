const { Observable } = require('rx')

const makeLogDriver = () =>
  msg$ =>
    msg$.subscribe(x => console.log(x))

const makeWebSocketDriver = url => {
  const ws = new WebSocket(url)

  return sink$ => {
    let $responses = Observable.create(observer => {
      ws.onmessage = msg =>
        observer.onNext(msg)
      ws.onopen = e =>
        console.log('websocket connected.')
      ws.onerror = e =>
        console.log(e)
    })

    sink$.subscribe(sink =>
      ws.send(sink))

    return $responses
  }
}

module.exports = {
  makeLogDriver,
  makeWebSocketDriver
}
