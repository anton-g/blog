import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SoundProvider } from '../contexts/SoundContext'
import { plusJakarta, abril, shareTech, yeseva } from '../styles/fonts'
import GlobalStyles from '../styles/global'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${plusJakarta.className} ${plusJakarta.variable} ${abril.variable} ${shareTech.variable} ${yeseva.variable}`}
    >
      <GlobalStyles />
      <SoundProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SoundProvider>
    </div>
  )
}
