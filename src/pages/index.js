import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

import { SoundContext } from '../components/common/SoundContext'

const BlogIndex = props => {
  const [soundEnabled, setSoundEnabled] = useState(true)

  return (
    <SoundContext.Provider value={[soundEnabled, setSoundEnabled]}>
      <Layout location={props.location}>
        <SEO title={'home'} meta={[{ name: 'og:type', content: 'website' }]} />
        Hello!
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
