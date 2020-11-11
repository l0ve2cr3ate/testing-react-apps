// testing with context and a custom render method
// http://localhost:3000/easy-button
// Exercise 7 Extra Credit 2

import * as React from 'react'
import {render as renderRtl, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

// ### 2. 💯 create a custom render method
// The duplication is cramping my style. Create a custom render method that
// encapsulates this shared logic. It'll need to accept an option for the `theme`
// (dark or light).

function render(ui, {theme = 'light', ...options} = {}) {
    const Wrapper = ({children}) => (
      <ThemeProvider value={[theme, () => {}]}>{children}</ThemeProvider>
    )
    return renderRtl(ui, {wrapper: Wrapper, ...options})
  }

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
