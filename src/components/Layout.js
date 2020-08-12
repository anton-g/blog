import React from 'react'
import Header from './Header'

require('../fonts/inter/inter.css')
require('../fonts/ms-sans-serif/ms-sans-serif.css')
require('./index.css')
require('./prism-theme.css')

export default function Layout({ children, maxWidth }) {
  return (
    <div style={{ paddingTop: '3rem' }}>
      <Header />
      <main
        style={{
          maxWidth: maxWidth ? maxWidth : '800px',
          margin: '0 auto 0',
        }}
      >
        {children}
      </main>
    </div>
  )
}
