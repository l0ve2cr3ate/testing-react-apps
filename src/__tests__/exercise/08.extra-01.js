// testing custom hooks
// http://localhost:3000/counter-hook
// Exercise 8 Extra Credit 1

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

// ## Extra Credit

// ### 1. 💯 fake component

// Sometimes it's hard to write a test component without making a pretty
// complicated "TestComponent." For those situations, you can try something like
// this:

// ```javascript
// const results = {}
// function TestComponent(props) {
//   Object.assign(results, useCustomHook())
//   return null
// }

// // interact with and assert on results here
// ```

// Learn more about this approach from my blog post:
// [How to test custom React hooks](https://kentcdodds.com/blog/how-to-test-custom-react-hooks)


let results;
function TestComponent(props) {
  results = useCounter()
  return null
}
  
  test('exposes the count and increment/decrement functions', () => {
    render(<TestComponent />)
    
    expect(results.count).toBe(0)
    act(() => results.increment())
    expect(results.count).toBe(1)
    act(() => results.decrement())
    expect(results.count).toBe(0)
  
  })
  
  /* eslint no-unused-vars:0 */
  