import type { AppProps } from 'next/app'
import styled, { ThemeProvider } from 'styled-components'
import { lightTheme } from '../styles/theme'
import GlobalStyle from '../styles/global'
import { useCallback, useContext } from 'react'
import { SoundContext, SoundProvider } from '../SoundContext'
import { SpeakerLoudIcon, SpeakerOffIcon, SpeakerQuietIcon, TwitterLogoIcon } from '@radix-ui/react-icons'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <SoundProvider>
        <Component {...pageProps} />
      </SoundProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default MyApp
