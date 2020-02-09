import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import styled from 'styled-components'
import About from '../components/About'

class BlogIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title={'home'} />
        <Content>
          <About></About>
        </Content>
      </Layout>
    )
  }
}

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 100px);
  grid-auto-rows: 100px;
`

function Foo() {
  return (
    <div
      style={{
        border: '2px dashed red',
        gridColumnStart: 'span 2',
        gridRowStart: 'span 2',
      }}
    ></div>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
