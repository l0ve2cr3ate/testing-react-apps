// mocking Browser APIs and modules
// http://localhost:3000/location
// Exercise 6 Extra Credit 2

import * as React from 'react'
import {render, act} from '@testing-library/react'
import Location from '../../examples/location'


// ### 2. 💯 test the unhappy path

// > NOTE: A recording of me doing this extra credit is not on EpicReact.Dev yet,
// > but feel free to give it a try anyway!

// Add a test for what happens in the event of an error. You can try it with the
// module mocking approach, but in my solution, I go back to the function mocking
// version.

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
  
  
  test('displays an error when not able to display users location', async () => {
  
   const error = new Error('Oh no something went wrong! Did you give permission to access your location details?')
  
    const {promise, reject} = deferred()
    window.navigator.geolocation.getCurrentPosition.mockImplementation(
        (successCallback, errorCallback) => {
          promise.catch(() => errorCallback(error))
        },
      )
  
    const {getByRole, getByLabelText, queryByLabelText} = render(<Location />)
    
    expect(getByLabelText(/loading/i)).toBeInTheDocument()
  
    await act(async () => {
      reject()
    })
   
    expect(queryByLabelText(/loading/i)).not.toBeInTheDocument()
  
    expect(getByRole('alert')).toHaveTextContent(error.message)
  })
  
  /*
  eslint
    no-unused-vars: "off",
  */
  