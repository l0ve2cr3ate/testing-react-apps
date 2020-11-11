// mocking Browser APIs and modules
// http://localhost:3000/location
// Exercise 6 Extra Credit 1

import * as React from 'react'
import {render, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

// ## Extra Credit

// ### 1. 💯 mock the module

// Sometimes, the module is interacting with browser APIs that are just too hard to
// mock (like `canvas`) or you're comfortable relying on the module's own test
// suite to give you confidence that so long as you use the module properly
// everything should work.

// In that case, it's reasonable to mock the module directly. So for this extra
// credit, try to mock the module rather than the browser API it's using.

// 💰 tip, you're mocking a hook. Your mock implementation can also be a hook (so
// you can use `React.useState`!).

jest.mock('react-use-geolocation')


test('displays the users current location', async () => {

  const fakePosition = {
    coords: {
      latitude: 20,
      longitude: 22,
    },
  }

  let setReturnValue
  const useMockCurrentPosition = () => {
      const state = React.useState([])
      setReturnValue = state[1]
      return state[0]
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  const {getByText, getByLabelText, queryByLabelText} = render(<Location />)
  
  expect(getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => setReturnValue([fakePosition]))

 
  expect(queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
  expect(getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
})

/*
eslint
  no-unused-vars: "off",
*/
