import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Header from './Header'
import Confettis from './common/Confettis/Confettis'
import { Callout } from './common/Callout'

require('../fonts/inter/inter.css')
require('../fonts/ms-sans-serif/ms-sans-serif.css')
require('./index.css')
require('./prism-theme.css')

const shortcodes = { Confettis, Callout }

export default function Layout({ children, maxWidth }) {
  return (
    <div style={{ paddingTop: '3rem', position: 'relative', zIndex: 2 }}>
      <Header />
      <MDXProvider components={shortcodes}>
        <main
          style={{
            maxWidth: maxWidth ? maxWidth : '800px',
            margin: '0 auto 0'
          }}
        >
          {children}
        </main>
      </MDXProvider>
    </div>
  )
}
