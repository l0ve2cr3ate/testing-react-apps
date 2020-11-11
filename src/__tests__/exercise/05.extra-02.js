// mocking HTTP requests
// http://localhost:3000/login-submission
// Exercise 5 Extra Credit 2

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {setupServer} from 'msw/node'
import {handlers} from 'test/server-handlers'
import Login from '../../components/login-submission'

// ### 2. 💯 test the unhappy path

// Add a test for what happens if the response to our login request is a failure.
// Our server handlers already handle situations where the username or password are
// not provided, so you can simply not fill one of those values in and then you'll
// want to make sure the error message is displayed.

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

test(`error message is displayed when username is not typed into login form`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  const spinner = screen.getByLabelText(/loading/i)
  await waitForElementToBeRemoved(spinner)

  expect(screen.getByRole('alert')).toHaveTextContent('username required')
})

test(`error message is displayed when password is not typed into login form`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  const spinner = screen.getByLabelText(/loading/i)
  await waitForElementToBeRemoved(spinner)

  expect(screen.getByRole('alert')).toHaveTextContent('password required')
})
