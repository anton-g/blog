import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../styles/theme'
import GlobalStyle from '../styles/global'
import { SoundProvider } from '../SoundContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserConfigProvider } from '../UserConfigContext'
import { plusJakarta, yeseva, abril, shareTech } from '../fonts'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserConfigProvider>
        <ThemeProvider theme={lightTheme}>
          <div className={`${plusJakarta.className} ${abril.variable} ${shareTech.variable} ${yeseva.variable}`}>
            <SoundProvider>
              <Component {...pageProps} />
            </SoundProvider>
            <GlobalStyle />
          </div>
        </ThemeProvider>
      </UserConfigProvider>
    </QueryClientProvider>
  )
}

export default MyApp
