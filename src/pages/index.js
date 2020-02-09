import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import styled from 'styled-components'
import About from '../components/Startpage/About'
import Blog from '../components/Startpage/Blog'
import Stripes from '../components/Startpage/Stripes'
import Dragger from '../components/Startpage/Dragger'

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
            <Dragger></Dragger>
          </Content>
        </div>
      </Layout>
    )
  }
}

const Foo = styled.div`
  grid-row-start: 2 span;
  grid-column-start: 4 span;

  border: 2px dotted red;
`

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
