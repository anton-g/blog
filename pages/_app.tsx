import type { AppProps } from 'next/app'
import { SoundProvider } from '../contexts/SoundContext'
import { plusJakarta, abril, shareTech, yeseva } from '../styles/fonts'
import GlobalStyles from '../styles/global'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${plusJakarta.className} ${abril.variable} ${shareTech.variable} ${yeseva.variable}`}
    >
      <SoundProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </SoundProvider>
    </div>
  )
}
