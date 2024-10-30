import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'

import './tailwind.css'
import { SoundProvider } from './other/sound-context'

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Share+Tech+Mono&family=Yeseva+One&display=swap',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <SoundProvider>
      {/* <QueryClientProvider client={queryClient}> */}
      {/* <AchievementsModal /> */}
      <Outlet />
      {/* </QueryClientProvider> */}
    </SoundProvider>
  )
}
