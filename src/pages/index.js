import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

import { SoundContext } from '../components/common/SoundContext'

const BlogIndex = props => {
  const [soundEnabled, setSoundEnabled] = useState(true)

  return (
    <SoundContext.Provider value={[soundEnabled, setSoundEnabled]}>
      <Layout maxWidth="550px" location={props.location}>
        <SEO title={'home'} meta={[{ name: 'og:type', content: 'website' }]} />
        <Content>
          <h1>
            Hi, I'm Anton!{' '}
            <span role="img" aria-label="waving hand emoji">
              👋
            </span>
          </h1>
          <p>
            I'm a web developer consultant and this is my corner of the
            internet, my <Link to="/digital-garden">Digital Garden</Link>{' '}
            <span role="img" aria-label="leaf emoji">
              🌿
            </span>
            . Here you can find things I write, like why I think{' '}
            <Link to="software-development-is-a-social-profession">
              our profession is social at it's core
            </Link>{' '}
            or about{' '}
            <Link to="render-props">render props and hooks in React</Link>.
          </p>
          <p>
            You might also find some of my projects, talks I've given or other
            things I just find interesting. Any questions? Hit me up on{' '}
            <a href="https://twitter.com/awnton">Twitter!</a>
          </p>
        </Content>
      </Layout>
    </SoundContext.Provider>
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

const Content = styled.div`
  font-size: 18px;
  padding: 0 16px;
  line-height: 1.4;
`
