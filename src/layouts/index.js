import React from 'react'
import Header from '../components/Header'

require('./superstylin.css')
require('prismjs/themes/prism.css');
require('./index.css')

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <div>
        <Header small={location.pathname !== rootPath}></Header>
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
