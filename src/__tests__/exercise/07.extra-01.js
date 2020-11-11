// testing with context and a custom render method
// http://localhost:3000/easy-button
// Exercise 7 Extra Credit 1

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

// ## Extra Credit
// ### 1. 💯 add a test for the dark theme
// Should mostly be a copy/paste and change the `initialTheme` and assertion a bit.

test('renders with the dark styles for the dark theme', () => {
    function Wrapper({children}) {
      return <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
    }
  
    render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})
    const button = screen.getByRole('button', {name: /easy/i})
    expect(button).toHaveStyle(`
      background-color: black;
      color: white;
    `)
  })
  
  /* eslint no-unused-vars:0 */
  