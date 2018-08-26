import React from 'react'
import Link from 'gatsby-link'
require('./superstylin.css')
require('prismjs/themes/prism.css');
require('./index.css')

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    if (location.pathname === rootPath) {
      header = (
        <h1>
          <Link to={'/'} style={{
            textDecoration: 'none'
          }}>
            anton gunnarsson
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3>
          <Link to={'/'} style={{
            textDecoration: 'none'
          }}>
            anton gunnarsson
          </Link>
        </h3>
      )
    }
    return (
      <div>
        <header>
          {header}
        </header>
        <main style={{
          maxWidth: '800px',
          margin: '0 auto 0'
        }}>
          {children()}
        </main>
      </div>
    )
  }
}

export default Template
