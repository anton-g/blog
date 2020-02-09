import React from 'react'
import Header from './Header'

require('../fonts/inter/inter.css')
require('../fonts/ms-sans-serif/ms-sans-serif.css')
require('prismjs/themes/prism.css')
require('./index.css')

class Layout extends React.Component {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <div>
        <Header small={location.pathname !== rootPath} />
        <main
          style={{
            maxWidth: '800px',
            margin: '0 auto 0',
          }}
        >
          {children}
        </main>
      </div>
    )
  }
}

export default Layout
