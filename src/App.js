import React from 'react'
import { ThemeProvider } from './ThemeContext'
import { SoundProvider } from './SoundContext'

// import GlobalStyles from './GlobalStyles';

function App({ children }) {
  return (
    <ThemeProvider>
      <SoundProvider>
        {/* <GlobalStyles /> */}
        {children}
      </SoundProvider>
    </ThemeProvider>
  )
}

export default App
