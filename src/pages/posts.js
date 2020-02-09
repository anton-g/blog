import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

class Posts extends React.Component {
  render() {
    const posts = get(this, 'props.data.allMdx.edges')

    return (
      <Layout location={this.props.location} maxWidth="600px">
        <SEO title={`posts`} />
        {posts
          .filter(({ node }) => !get(node, 'frontmatter.draft'))
          .map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug
            return (
              <div key={node.fields.slug}>
                <h3>
                  <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </div>
            )
          })}
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
            draft
          }
        }
      }
    }
  }
`
