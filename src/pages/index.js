import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import styled from 'styled-components'
import About from '../components/Startpage/About'
import Blog from '../components/Startpage/Blog'
import Stripes from '../components/Startpage/Stripes'
import Dragger from '../components/Startpage/Dragger'
import Morphism from '../components/Startpage/Morphism'

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
            <Morphism></Morphism>
            <Dragger></Dragger>
          </Content>
        </div>
      </Layout>
    )
  }
}

const Content = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: 100px;
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
