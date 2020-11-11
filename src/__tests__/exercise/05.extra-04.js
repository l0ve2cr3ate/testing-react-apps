// mocking HTTP requests
// http://localhost:3000/login-submission
// Exercise 5 Extra Credit 4

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {handlers} from 'test/server-handlers'
import Login from '../../components/login-submission'

// ### 4. 💯 use one-off server handlers

// How would we test a situation where the server fails for some unknown reason?
// There are plenty of situations where we want to test what happens when the
// _server_ misbehaves. But we don't want to code those scenarios in our
// application-wide server handlers for two reasons:

// 1. It clutters our application-wide handlers. Lots of the same problems of CSS
//    applies here: people are afraid to modify or delete any code because they're
//    uncertain what other code will break as a result.
// 2. The indirection makes the tests harder to understand.

// [Read more about the benefits of colocation](https://kentcdodds.com/blog/colocation).

// So instead, we want one-off server handlers to be written directly in the test
// that needs it. This is what MSW's `server.use` API is for. It allows you to add
// server handlers after the server has already started. And the
// `server.resetHandlers()` allows you to remove those added handlers between tests
// to preserve test isolation and restore the original handlers.

// See if you can add another test to check a situation for when the server
// misbehaves and sends a status code 500 error.

// 💰 Here's something to get you started:

// ```javascript
// server.use(
//   rest.post(
//     // note that it's the same URL as our app-wide handler
//     // so this will override the other.
//     'https://auth-provider.example.com/api/login',
//     async (req, res, ctx) => {
//       // your one-off handler here
//     },
//   ),
// )
// ```

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test(`logging in displays the user's username`, async () => {
  const error = 'Error happened'
  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({message: error}))
      },
    ),
  )
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  const spinner = screen.getByLabelText(/loading/i)
  await waitForElementToBeRemoved(spinner)

  expect(screen.getByRole('alert')).toHaveTextContent(error)
})
