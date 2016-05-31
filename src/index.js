const { run } = require('@cycle/core')
const { button, div, label, input, hr, h1, makeDOMDriver } = require('@cycle/dom')
const { Observable } = require('rx')

const makeLogDriver = () =>
  msg$ =>
    msg$.subscribe(x => console.log(x))

const makeWebSocketDriver = url => {
  const ws = new WebSocket(url)

  return sink$ => {
    let $responses = Observable.create(function (observer) {
      ws.onmessage = msg =>
        observer.onNext(msg)
      ws.onopen = e => console.log('connection opened')
      ws.onerror = e => console.log(e)
    })

    sink$.subscribe(sink =>
      ws.send(sink))

    return $responses
  }
}

const main = ({ DOM, WS }) => {
  const click$ = DOM.select('.button').events('click')
    .map(e => 'click from client')

  return {
    DOM: DOM.select('.field').events('input')
      .map(e => e.target.value)
      .startWith('')
      .map(name =>
        div([
          label('Name: '),
          input('.field', { attributes: { type: 'text' } }),
          hr(),
          h1('Hello, ' + name),
          button('.button', 'click')
        ])
      ),
    ws: click$,
    log: WS
  }
}

run(main, {
  DOM: makeDOMDriver('#app'),
  WS: makeWebSocketDriver(`ws://${location.host}`),
  log: makeLogDriver()
})
