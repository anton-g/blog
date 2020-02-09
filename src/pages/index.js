import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import styled from 'styled-components'
import About from '../components/About'
import Blog from '../components/Blog'
import Stripes from '../components/Stripes'

class BlogIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title={'home'} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Content>
            <About width="2" height="2"></About>
            <Blog width="4" height="1"></Blog>
            <Stripes width="2" height="4"></Stripes>
          </Content>
        </div>
      </Layout>
    )
  }
}

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 100px);
  grid-auto-rows: 100px;

  @media screen and (max-width: 799px) {
    grid-template-columns: repeat(6, 100px);
  }

  @media screen and (max-width: 599px) {
    grid-template-columns: repeat(4, 100px);
  }
`

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
