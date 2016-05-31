const { run } = require('@cycle/core')
const { div, label, input, hr, h1, makeDOMDriver } = require('@cycle/dom')

const main = ({ DOM }) => ({
  DOM: DOM.select('.field').events('input')
    .map(e => e.target.value)
    .startWith('')
    .map(name =>
      div([
        label('Name: '),
        input('.field', { attributes: { type: 'text' } }),
        hr(),
        h1('Hello, ' + name)
      ])
    )
})

run(main, {
  DOM: makeDOMDriver('#app')
})