const { run } = require('@cycle/core')
const { button, div, label, input, hr, h1, makeDOMDriver } = require('@cycle/dom')
const { Observable } = require('rx')
const { makeLogDriver, makeWebSocketDriver } = require('./drivers')


const main = ({ DOM, WS }) => {
  const click$ = DOM.select('.button').events('click')
    .map(e => 'click from client')
  const vtree$ = DOM.select('.field').events('input')
    .map(e => e.target.value)
    .startWith('')
    .map(name =>
      div([
        input('.field', { attributes: { type: 'text' } }),
        h1(`hello ${name}`),
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
