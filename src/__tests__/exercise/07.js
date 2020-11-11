// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

// ## Exercise

// In this exercise, we have an "Easy Button" that's styled differently based on
// the Theme context. Your job is to assert on the styles it has, but you first
// need to render the UI with the ThemeProvider (and set the `initialTheme` value).

test('renders with the light styles for the light theme', () => {
  function Wrapper({children}) {
    return <ThemeProvider initialTheme="light">{children}</ThemeProvider>
  }

  render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

/* eslint no-unused-vars:0 */
