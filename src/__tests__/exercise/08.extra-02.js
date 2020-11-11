// testing custom hooks
// http://localhost:3000/counter-hook
// Exercise 8 Extra Credit 2

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

// ### 2. 💯 setup function

// Add tests titled:

// 1. allows customization of the initial count
// 2. allows customization of the step

// And test those use cases. Then abstract away the common logic into a `setup`
// function. This one might be a little tricky thanks to variable references, but I
// know you can do it!

function setup({initialProps} = {}) {
  const results = {}
  function TestComponent(props) {
    results.current = useCounter(props)
    return null
  }
  render(<TestComponent {...initialProps} />)
  return results
}

test('exposes the count and increment/decrement functions', () => {
  const results = setup()
  expect(results.current.count).toBe(0)
  act(() => results.current.increment())
  expect(results.current.count).toBe(1)
  act(() => results.current.decrement())
  expect(results.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const results = setup({initialProps: {initialCount: 5}})
  expect(results.current.count).toBe(5)
  act(() => results.current.increment())
  expect(results.current.count).toBe(6)
  act(() => results.current.decrement())
  expect(results.current.count).toBe(5)
})

test('allows customization of the step', () => {
  const results = setup({initialProps: {step: 5}})
  expect(results.current.count).toBe(0)
  act(() => results.current.increment())
  expect(results.current.count).toBe(5)
  act(() => results.current.decrement())
  expect(results.current.count).toBe(0)
})

/* eslint no-unused-vars:0 */
