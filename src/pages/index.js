import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import styled from 'styled-components'
import About from '../components/Startpage/About'
import Blog from '../components/Startpage/Blog'
import Dragger from '../components/Startpage/Dragger/Dragger'
import Morphism from '../components/Startpage/Morphism/Morphism'
import Visitors from '../components/Startpage/Visitors'
import Inspiration from '../components/Startpage/Inspiration'
import Kampgeneratorn from '../components/Startpage/Kampgeneratorn'
import TvQuiz from '../components/Startpage/TvQuiz/TvQuiz'
import ColorTweaker from '../components/Startpage/ColorTweaker'
// import Spotify from '../components/Startpage/Spotify'
import Asdf from '../components/Startpage/Asdf/Asdf'
import AaaaAaahh from '../components/Startpage/AaaaAaahh/AaaaAaahh'
import Text from '../components/Startpage/Text'
import Todo from '../components/Startpage/Todo'
import { SoundContext } from '../components/common/SoundContext'
import SoundToggle from '../components/Startpage/SoundToggle/SoundToggle'

const BlogIndex = props => {
  const [soundEnabled, setSoundEnabled] = useState(true)

  return (
    <SoundContext.Provider value={[soundEnabled, setSoundEnabled]}>
      <Layout location={props.location}>
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
            <Todo></Todo>
            <SoundToggle></SoundToggle>
          </Content>
        </div>
      </Layout>
    </SoundContext.Provider>
  )
}

const Content = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, 100px);
  grid-auto-rows: 100px;
  grid-auto-flow: row dense;
  justify-content: center;
  margin-bottom: 2rem;
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
