// simple test with ReactDOM
// Exercise 1 Extra Credit 1

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

// ## Extra Credit

// ### 1. 💯 use dispatchEvent

// Using `.click` on a DOM node works fine, but what if you wanted to fire an event
// that doesn't have a dedicated method (like mouseover). Rather than use
// `button.click()`, try using `button.dispatchEvent`: 📜
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent

// > NOTE: Make sure that your event config sets `bubbles: true`

// 💰 Here's how you create a MouseEvent:

// ```javascript
// new MouseEvent('click', {
//   bubbles: true,
//   cancelable: true,
//   button: 0,
// })
// ```

test('counter increments and decrements when the buttons are clicked', () => {
  const element = document.createElement('div')
  document.body.append(element)
  ReactDOM.render(<Counter />, element)

  const [decrement, increment] = element.querySelectorAll('button')

  const message = element.firstChild.querySelector('div')
  expect(message.textContent).toBe('Current count: 0')

  const incrementClick = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  increment.dispatchEvent(incrementClick)
  expect(message.textContent).toBe('Current count: 1')

  const decrementClick = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  decrement.dispatchEvent(decrementClick)
  expect(message.textContent).toBe('Current count: 0')

  element.remove()
})
