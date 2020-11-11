// testing with context and a custom render method
// http://localhost:3000/easy-button
// Exercise 7 Extra Credit 3

import * as React from 'react'
import {render, screen} from 'test/test-utils'
import EasyButton from '../../components/easy-button'

// ### 3. 💯 swap @testing-library/react with app test utils
// We've actually already created a custom render method for this! So swap your
// `import` of `@testing-library/react` with `test/test-utils` which you can find
// in `./src/test/test-utils.js`.

test('renders with the dark styles for the dark theme', () => {
    render(<EasyButton>Easy</EasyButton>, {theme: "dark"})
    const button = screen.getByRole('button', {name: /easy/i})
    expect(button).toHaveStyle(`
      background-color: black;
      color: white;
    `)
  })

  
test('renders with the light styles for the light theme', () => {
    render(<EasyButton>Easy</EasyButton>)
    const button = screen.getByRole('button', {name: /easy/i})
    expect(button).toHaveStyle(`
      background-color: white;
      color: black;
    `)
  })
