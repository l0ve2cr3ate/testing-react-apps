// simple test with React Testing Library
// http://localhost:3000/counter
// Exercise 2 Extra Credit 1

import * as React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Counter from '../../components/counter'

// ## Extra Credit

// ### 1. 💯 use @testing-library/jest-dom

// Testing Library also has a suite of assertions that can be installed with Jest.
// They're already added to this project, so you can switch from Jest's built-in
// assertions to more specific assertions which will give you better error
// messages. So go ahead and swap the `expect(message.textContent).toBe(...)`
// assertions with `toHaveTextContent` from
// [`@testing-library/jest-dom`](http://testing-library.com/jest-dom).

test('counter increments and decrements when the buttons are clicked', () => {
  const {container} = render(<Counter />)

  const [decrement, increment] = container.querySelectorAll('button')
  const message = container.firstChild.querySelector('div')

  expect(message).toHaveTextContent('Current count: 0')

  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')

  fireEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
