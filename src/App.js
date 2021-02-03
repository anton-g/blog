import React from 'react'
import { ThemeProvider } from './ThemeContext'
import { SoundProvider } from './SoundContext'

function App({ children }) {
  return (
    <ThemeProvider>
      <SoundProvider>{children}</SoundProvider>
    </ThemeProvider>
  )
}

export default App
