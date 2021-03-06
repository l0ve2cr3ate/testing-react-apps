// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  let submittedData
  const handleSubmit = data => (submittedData = data)

  const {getByLabelText, getByText} = render(<Login onSubmit={handleSubmit} />)

  const username = getByLabelText(/username/i)
  const password = getByLabelText(/password/i)
  userEvent.type(username, 'username')
  userEvent.type(password, 'password')

  const button = getByText(/submit/i)
  userEvent.click(button)

  expect(submittedData).toEqual({username: 'username', password: 'password'})
})

/*
eslint
  no-unused-vars: "off",
*/
