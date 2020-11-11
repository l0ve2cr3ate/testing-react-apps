// mocking HTTP requests
// http://localhost:3000/login-submission
// Exercise 5 Extra Credit 3

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {setupServer} from 'msw/node'
import {handlers} from 'test/server-handlers'
import Login from '../../components/login-submission'

// ### 3. 💯 use inline snapshots for error messages

// Copy and pasting output into your test assertion (like the error message in our
// last extra credit) is no fun. Especially if that error message were to change in
// the future.

// Instead, we can use a special assertion to take a "snapshot" of the error
// message and Jest will update our code for us. Use `toMatchInlineSnapshot` rather
// than an explicit assertion on that error element.

// 📜 [Snapshot Testing](https://jestjs.io/docs/en/snapshot-testing)

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

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"username required"`,
  )
})

test(`error message is displayed when password is not typed into login form`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  const spinner = screen.getByLabelText(/loading/i)
  await waitForElementToBeRemoved(spinner)

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  )
})
