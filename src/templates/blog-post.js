import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import getShareImage from '@jlengstorf/get-share-image'
import SEO from '../components/Seo'
import Layout from '../components/Layout'
import styled from 'styled-components'
import ConfettiCanon from '../components/common/ConfettiCanon/ConfettiCanon'

import twitter from './twitter.png'

const PostState = ({ state }) => {
  let text = ''
  switch (state) {
    case 'budding':
      text = '🌱 This post is just budding and will be updated.'
      break
    case 'growing':
      text = '🌿 This post is still growing and will likely be updated.'
      break
    case 'bloomed':
      text = '🌸 This post has bloomed and is unlikely to change.'
      break
  }
  return <StateText>{text}</StateText>
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const isUnlisted = post.frontmatter.unlisted
    const { previous, next } = this.props.pathContext

    const socialImage = getShareImage({
      title: post.frontmatter.title,
      tagline: post.frontmatter.description,
      titleFont: 'roboto',
      titleFontSize: 94,
      titleExtraConfig: 'bold',
      taglineFont: 'roboto',
      taglineFontSize: 48,
      cloudName: 'anton-g',
      imagePublicID: 'social-card-template_jphyku',
    })

    const encodedTitle = encodeURI('"' + post.frontmatter.title + '"')
    const shareLink = `https://twitter.com/share?url=${this.props.location.href}&text=${encodedTitle}%20by%20Anton%20Gunnarsson.&via=Awnton`

    return (
      <Layout maxWidth="750px" location={this.props.location}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description}
          meta={[
            { name: 'og:image', content: socialImage },
            { name: 'og:type', content: 'article' },
          ]}
        />
        <Post>
          <h1>{post.frontmatter.title}</h1>
          <PostState state={post.frontmatter.state} />
          <MDXRenderer>{post.body}</MDXRenderer>
          {post.frontmatter.dev && (
            <a
              href={post.frontmatter.dev}
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '16px 0px',
              }}
            >
              <img
                src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg"
                alt="DEV.to badge"
                height="25"
                width="25"
                style={{ marginRight: '5px' }}
              />
              Discuss on DEV
            </a>
          )}
          <Timestamp>Last update: {post.frontmatter.date}</Timestamp>
          <Footer>
            <ConfettiWrapper>
              <ConfettiCanon></ConfettiCanon>
              <Arrow>
                <svg
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
              </Arrow>
              <p>
                Enjoyed the post? <br />
                Celebrate with <b>confetti</b>! 🎉
              </p>
            </ConfettiWrapper>
            {!isUnlisted && (
              <TwitterWrapper>
                <p>Share this post on Twitter!</p>
                <Arrow>
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Arrow>
                <a href={shareLink} target="_blank" rel="noopener noreferrer">
                  <img src={twitter} alt="twitter logo"></img>
                </a>
              </TwitterWrapper>
            )}
          </Footer>
        </Post>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        dev
        unlisted
        state
      }
    }
  }
`

const Post = styled.div`
  padding: 0px 12px;
  line-height: 1.5;
  font-size: 18px;
  text-rendering: optimizelegibility;

  h1 {
    margin-bottom: 0;
    color: hsl(157, 15%, 15%);
  }
`

const StateText = styled.span`
  font-size: 14px;
  font-style: italic;
`

const Timestamp = styled.p`
  margin-top: 32px;
  margin-bottom: 48px;
  font-size: 12px;
  color: hsl(157, 5%, 36%);
  text-align: right;
`

const Arrow = styled.div`
  width: 20px;
  height: 20px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 64px;
`

const TwitterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;

  img {
    height: 100px;
    width: 100px;
    transition: transform 0.3s;
  }

  a:hover img {
    transform: scale(1.2) rotateZ(-10deg);
  }

  p {
    max-width: 150px;
    text-align: right;
  }

  ${Arrow} {
    margin-left: 20px;
  }
`

const ConfettiWrapper = styled.div`
  display: flex;
  align-items: center;

  p {
    font-size: 16px;
  }

  ${Arrow} {
    margin-right: 20px;
  }
`
