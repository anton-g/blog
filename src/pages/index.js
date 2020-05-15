import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import styled from 'styled-components'
import About from '../components/Startpage/About'
import Blog from '../components/Startpage/Blog'
import Dragger from '../components/Startpage/Dragger'
import Morphism from '../components/Startpage/Morphism'
import Visitors from '../components/Startpage/Visitors'
import Inspiration from '../components/Startpage/Inspiration'
import Kampgeneratorn from '../components/Startpage/Kampgeneratorn'
import TvQuiz from '../components/Startpage/TvQuiz'
import ColorTweaker from '../components/Startpage/ColorTweaker'
// import Spotify from '../components/Startpage/Spotify'
import Asdf from '../components/Startpage/Asdf'
import AaaaAaahh from '../components/Startpage/AaaaAaahh'
import Text from '../components/Startpage/Text'

class BlogIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title={'home'} meta={[{ name: 'og:type', content: 'website' }]} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Content>
            <About></About>
            <Blog></Blog>
            <Morphism></Morphism>
            <Dragger></Dragger>
            <Visitors></Visitors>
            <Inspiration></Inspiration>
            <Kampgeneratorn></Kampgeneratorn>
            <TvQuiz></TvQuiz>
            <Asdf></Asdf>
            <ColorTweaker></ColorTweaker>
            {/* <Spotify></Spotify> */}
            <AaaaAaahh></AaaaAaahh>
            <Text></Text>
          </Content>
        </div>
      </Layout>
    )
  }
}

const Content = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, 100px);
  grid-auto-rows: 100px;
  grid-auto-flow: row dense;
  justify-content: center;
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
