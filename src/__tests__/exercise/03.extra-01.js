// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

// ## Extra Credit

// ### 1. 💯 use userEvent

// As it turns out, clicking these buttons is also a bit of an implementation
// detail. We're firing a single event, when we actually should be firing several
// other events like the user does. When a user clicks a button, they first have to
// move their mouse over the button which will fire some mouse events. They'll also
// mouse down and mouse up on the input and focus it! Lots of events!

// If we want to be truly implementation detail free, then we should probably fire
// all those same events too. Luckily for us, Testing Library has us covered with
// `@testing-library/user-event`. This may one-day be baked directly into
// `@testing-library/dom`, but for now it's in a separate package.

// For this extra credit, swap out `fireEvent` for `userEvent` which you can get
// like so:

// ```javascript
// import userEvent from '@testing-library/user-event'
// ```

// Once you're done, look around in the code of `@testing-library/user-event`'s
// [`click` method](https://github.com/testing-library/user-event/blob/1af67066f57377c5ab758a1215711dddabad2d83/src/index.js#L109-L131).
// It's pretty interesting!

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />)
  const increment = screen.getByText(/increment/i)
  const decrement = screen.getByText(/decrement/i)
  const message = screen.getByText('Current count: 0')

  expect(message).toHaveTextContent('Current count: 0')
  userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
