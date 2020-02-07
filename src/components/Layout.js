import React from 'react'
import Header from './Header'
import Navigation from './Navigation'
import styled from 'styled-components'

require('../fonts/inter/inter.css')
require('prismjs/themes/prism.css')
require('./index.css')

class Layout extends React.Component {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <div>
        <Header small={location.pathname !== rootPath} />
        <Content>
          <aside>
            <Navigation></Navigation>
          </aside>
          <main
            style={{
              maxWidth: '800px',
              margin: '0 auto 0',
            }}
          >
            {children}
          </main>
        </Content>
      </div>
    )
  }
}

const Content = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`

export default Layout
