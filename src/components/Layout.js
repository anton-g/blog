import React from 'react'
import Header from './Header'

require('../fonts/inter/inter.css')
require('../fonts/ms-sans-serif/ms-sans-serif.css')
require('./index.css')
require('./prism-theme.css')

export default function Layout({ location, children, maxWidth }) {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <div>
      <Header small={location.pathname !== rootPath} />
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
