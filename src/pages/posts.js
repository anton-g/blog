import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import styled from 'styled-components'

class Posts extends React.Component {
  render() {
    const posts = get(this, 'props.data.allMdx.edges')

    return (
      <Layout location={this.props.location} maxWidth="1000px">
        <SEO title={`posts`} />
        <PostsWrapper>
          {posts
            .filter(({ node }) => !get(node, 'frontmatter.unlisted'))
            .map(({ node }) => {
              const title = get(node, 'frontmatter.title') || node.fields.slug
              return (
                <PostLink key={node.fields.slug} to={node.fields.slug}>
                  {title}
                </PostLink>
              )
            })}
        </PostsWrapper>
      </Layout>
    )
  }
}

export default Posts

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            unlisted
          }
        }
      }
    }
  }
`

const PostsWrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  padding: 0px 12px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 4rem;
  grid-row-gap: 3rem;

  @media only screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-row-gap: 1.8rem;
  }
`

const PostLink = styled(Link)`
  font-size: 1.8rem;
  font-family: Inter;
  font-weight: bold;
  text-decoration: none;
  text-decoration-style: none;
  text-decoration-thickness: 3px;
  padding-bottom: 0.3rem;

  &:hover {
    text-decoration: underline var(--color-primary) wavy;
    -webkit-text-decoration: underline var(--color-primary) wavy;
    outline: 1px solid rgba(255, 255, 255, 0.01);
  }

  &:nth-child(2n + 1) {
    text-align: right;
  }

  @media only screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 550px;
    text-align: center;
    margin: 0 auto;

    &:nth-child(2n + 1) {
      text-align: center;
    }
  }
`
