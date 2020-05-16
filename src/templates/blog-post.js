import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import getShareImage from '@jlengstorf/get-share-image'
import Bio from '../components/Bio'
import Draft from '../components/Draft'
import SEO from '../components/Seo'
import Layout from '../components/Layout'
import styled from 'styled-components'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const isDraft = post.frontmatter.draft
    const { previous, next } = this.props.pathContext

    const socialImage = getShareImage({
      title: post.frontmatter.title,
      tagline: post.frontmatter.description,
      titleFont: 'roboto',
      titleFontSize: 72,
      titleExtraConfig: 'bold',
      taglineFont: 'roboto',
      taglineFontSize: 48,
      cloudName: 'anton-g',
      imagePublicID: 'social-card-template_jphyku',
    })

    return (
      <Layout maxWidth="750px" location={this.props.location}>
        {isDraft && <Draft />}
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
          <hr style={{ marginBottom: '8px' }} />
          <Timestamp>Last update: {post.frontmatter.date}</Timestamp>
          <Paging>
            <PagingLink>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </PagingLink>
            <PagingLink>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </PagingLink>
          </Paging>
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
        draft
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

const Timestamp = styled.p`
  margin-top: 0;
  font-size: 12px;
  color: hsl(157, 5%, 36%);
`

const Paging = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`

const PagingLink = styled.li`
  margin: 0;
`
