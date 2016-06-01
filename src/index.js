const { run } = require('@cycle/core')
const { button, div, input, p, makeDOMDriver } = require('@cycle/dom')
const { makeLogDriver, makeWebSocketDriver } = require('./drivers')

const main = ({ DOM, WS }) => {
  const click$ = DOM.select('.button').events('click')
    .map(e => 'click from client')
  const vtree$ = DOM.select('.field').events('input')
    .map(e => e.target.value)
    .startWith('')
    .map(name =>
      div([
        button('.button', 'click')
      ])
    )

  return {
    DOM: vtree$,
    WS: click$,
    log: WS
  }
}

run(main, {
  DOM: makeDOMDriver('#app'),
  WS: makeWebSocketDriver(`ws://${location.host}`),
  log: makeLogDriver()
})
