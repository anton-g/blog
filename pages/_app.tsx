import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SoundProvider } from '../contexts/SoundContext'
import { plusJakarta, abril, shareTech, yeseva } from '../styles/fonts'
import GlobalStyles from '../styles/global'
import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    Fathom.load('TZJQFTNI', {
      includedDomains: ['antongunnarsson.com', 'www.antongunnarsson.com'],
      url: 'https://earthy-merit.antongunnarsson.com/script.js',
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  return (
    <div
      className={`${plusJakarta.className} ${plusJakarta.variable} ${abril.variable} ${shareTech.variable} ${yeseva.variable}`}
      style={{ height: '100%' }}
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
