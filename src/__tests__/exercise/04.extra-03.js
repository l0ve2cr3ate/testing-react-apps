// form testing
// http://localhost:3000/login
// Exercise 4 Extra Credit 2

import * as React from 'react'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import Login from '../../components/login'

// ### 3. 💯 allow for overrides

// Sometimes you actually _do_ have some specific data that's important for the
// test. For example, if our form performed validation on the password being a
// certain strength, then we might not want a randomly generated password and we'd
// instead want a specific password.

// Try to make your `buildLoginForm` function accept overrides as well:

// ```javascript
// const {username, password} = buildLoginForm({password: 'abc'})
// // password === 'abc'
// ```

// That communicates the the reader of the test: "We just need a normal login form,
// except the password needs to be something specific for this test."

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()

  const {getByLabelText, getByText} = render(<Login onSubmit={handleSubmit} />)

  const buildLoginForm = overrides => {
    return {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      ...overrides,
    }
  }

  const {username, password} = buildLoginForm()
  userEvent.type(getByLabelText(/username/i), username)
  userEvent.type(getByLabelText(/password/i), password)

  const button = getByText(/submit/i)
  userEvent.click(button)

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
  expect(handleSubmit).toBeCalledTimes(1)
})
