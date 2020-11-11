// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// ## Exercise

// In this exercise, we have gone back to our simple counter, except now that logic
// is all in a custom hook and we need to test that functionality. To do that,
// we'll make a test component that uses the hook in the typical way that our hook
// will be used and then test that component, indirectly testing our hook.

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

const Counter = () => {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<Counter />)
  const decrement = screen.getByText(/decrement/i)
  const increment = screen.getByText(/increment/i)
  const message = screen.getByText(/current count:/i)
  
  expect(message).toHaveTextContent('Current count: 0')
  userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')

})

/* eslint no-unused-vars:0 */
