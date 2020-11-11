// mocking HTTP requests
// http://localhost:3000/login-submission
// Exercise 5 Extra Credit 1

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {setupServer} from 'msw/node'
import {handlers} from 'test/server-handlers'
import Login from '../../components/login-submission'

// ## Extra Credit

// ### 1. 💯 reuse server request handlers

// In my applications, I love having a mock server to use during development. It's
// often more reliable, works offline, doesn't require a lot of environment setup,
// and allows me to start writing UI for APIs that aren't finished yet.

// MSW was actually originally built for this use case and we've already
// implemented this server handler for our app in `test/server-handlers.js`, so for
// this extra credit, import that array of server handlers and send it along into
// the `setupServer` call.

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  const spinner = screen.getByLabelText(/loading/i)
  await waitForElementToBeRemoved(spinner)

  expect(screen.getByText(username)).toBeInTheDocument()
})
