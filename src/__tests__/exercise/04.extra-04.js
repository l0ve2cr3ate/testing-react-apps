// form testing
// http://localhost:3000/login
// Exercise 4 Extra Credit 4

import * as React from 'react'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

// ### 4. 💯 use Test Data Bot

// There's a library I like to use for generating test data:
// [`@jackfranklin/test-data-bot`](https://www.npmjs.com/package/@jackfranklin/test-data-bot).
// It provides a few nice utilities. Check out the docs there and swap your custom
// `buildLoginForm` with one you create using the Test Data Bot.

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()

  const {getByLabelText, getByText} = render(<Login onSubmit={handleSubmit} />)

  const buildLoginForm = build({
    fields: {
      username: fake(f => f.internet.userName()),
      password: fake(f => f.internet.password()),
    },
  })

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
