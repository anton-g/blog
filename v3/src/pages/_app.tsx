import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../styles/theme'
import GlobalStyle from '../styles/global'
import { SoundProvider } from '../SoundContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserConfigProvider } from '../UserConfigContext'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserConfigProvider>
        <ThemeProvider theme={lightTheme}>
          <SoundProvider>
            <Component {...pageProps} />
          </SoundProvider>
          <GlobalStyle />
        </ThemeProvider>
      </UserConfigProvider>
    </QueryClientProvider>
  )
}

export default MyApp
