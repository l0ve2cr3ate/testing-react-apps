// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, act} from '@testing-library/react'
import Location from '../../examples/location'

// ## Exercise

// We've got a `Location` component that will request the user's location and then
// display the latitude and longitude values on screen. An yup, you guessed it,
// `window.navigator.geolocation.getCurrentPosition` is not supported by jsdom, so
// we need to mock it out. We'll mock it with a jest mock function so we can call
// [`mockImplementation`](https://jestjs.io/docs/en/mock-function-api#mockfnmockimplementationfn)
// and mock what that function does for a particular test.

// We'll also bump into one of the few situations you need to use
// [`act`](https://reactjs.org/docs/test-utils.html#act) directly.
// [Learn more](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning).


window.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
}

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}


test('displays the users current location', async () => {

  const fakePosition = {
    coords: {
      latitude: 20,
      longitude: 22,
    },
  }

  const {promise, resolve} = deferred()
  window.navigator.geolocation.getCurrentPosition.mockImplementation(callback =>
    promise.then(() => callback(fakePosition))
  )

  const {getByText, getByLabelText, queryByLabelText} = render(<Location />)
  
  expect(getByLabelText(/loading/i)).toBeInTheDocument()

  await act(() => {
    resolve()
    return promise
  })
 
  expect(queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
  expect(getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
})

/*
eslint
  no-unused-vars: "off",
*/
