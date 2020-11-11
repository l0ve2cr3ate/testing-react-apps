// form testing
// http://localhost:3000/login
// Exercise 4 Extra Credit 2

import * as React from 'react'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import Login from '../../components/login'

// ### 2. 💯 generate test data

// An important thing to keep in mind when testing is simplifying the maintenance
// of the tests by reducing the amount of unrelated cruft in the test. You want to
// make it so the code for the test communicates what's important and what is not
// important.

// Specifically, in my solution I have these values:

// ```javascript
// const username = 'chucknorris'
// const password = 'i need no password'
// ```

// Does my code behave differently when the username is `chucknorris`? Do I have
// special logic around that? Without looking at the implementation I cannot be
// completely sure. What would be better is if the code communicated that the
// actual value is irrelevant. But how do you communicate that? A code comment?
// Nah, let's generate the value!

// ```javascript
// const username = getRandomUsername()
// const password = getRandomPassword()
// ```

// That communicates the intent really well. As a reader of the test I can think:
// "Oh, ok, great, so it doesn't matter what the username _is_, just that it's a
// typical username."

// Luckily, there's a package we can use for this called
// [faker](https://www.npmjs.com/package/faker). You can get a random username and
// password from `faker.internet.userName()` (note the capital `N`) and
// `faker.internet.password()`. We've already got it installed in this project, so
// go ahead and import that and generate the username and password.

// Even better, create a `buildLoginForm` function which allows me to call it like
// this:

// ```javascript
// const {username, password} = buildLoginForm()
// ```

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()

  const {getByLabelText, getByText} = render(<Login onSubmit={handleSubmit} />)

  const buildLoginForm = () => {
    const username = faker.internet.userName()
    const password = faker.internet.password()

    return {username, password}
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
