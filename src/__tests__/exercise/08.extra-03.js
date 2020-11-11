// testing custom hooks
// http://localhost:3000/counter-hook
// Exercise 8 Extra Credit 3

import * as React from 'react'
import {renderHook, act} from '@testing-library/react-hooks'
import useCounter from '../../components/use-counter'

// ### 3. 💯 using react-hooks testing library

// Your `setup` function is very similar to the `renderHook` function from
// [`@testing-library/react-hooks`](https://github.com/testing-library/react-hooks-testing-library)!
// Swap your own `setup` function with that.

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(() => useCounter())
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 5}})
  expect(result.current.count).toBe(5)
  act(() => result.current.increment())
  expect(result.current.count).toBe(6)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(5)
})

test('allows customization of the step', () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 5}})

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(5)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

/* eslint no-unused-vars:0 */
