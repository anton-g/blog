import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Bio from '../components/Bio'
import Draft from '../components/Draft'
import SEO from '../components/Seo'
import Layout from '../components/Layout'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const isDraft = post.frontmatter.draft
    const { previous, next } = this.props.pathContext

    return (
      <Layout location={this.props.location}>
        {isDraft && <Draft />}
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description}
        />
        <h1>{post.frontmatter.title}</h1>
        <p>{post.frontmatter.date}</p>
        <MDXRenderer>{post.body}</MDXRenderer>
        {post.frontmatter.dev && (
          <>
            <hr />
            <a href={post.frontmatter.dev}>Discuss this post on dev.to</a>
          </>
        )}
        <hr />
        <Bio />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li style={{ margin: 0 }}>
            {previous && (
              <Link
                className="button button-primary"
                to={previous.fields.slug}
                rel="prev"
              >
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link
                className="button button-primary"
                to={next.fields.slug}
                rel="next"
              >
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
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
