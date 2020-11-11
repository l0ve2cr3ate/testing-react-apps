// form testing
// http://localhost:3000/login
// Exercise 4 Extra Credit 1

import * as React from 'react'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

// ## Extra Credit

// ### 1. 💯 use a jest mock function

// Jest has built-in "mock" function APIs. Rather than creating the `submittedData`
// variable, try to use a mock function and assert it was called correctly:

// - 📜 `jest.fn()`: https://jestjs.io/docs/en/mock-function-api
// - 📜 `toHaveBeenCalledWith`:
//   https://jestjs.io/docs/en/expect#tohavebeencalledwitharg1-arg2-

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()

  const {getByLabelText, getByText} = render(<Login onSubmit={handleSubmit} />)

  const username = getByLabelText(/username/i)
  const password = getByLabelText(/password/i)
  userEvent.type(username, 'username')
  userEvent.type(password, 'password')

  const button = getByText(/submit/i)
  userEvent.click(button)

  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'username',
    password: 'password',
  })
})
