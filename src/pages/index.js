import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Link from 'gatsby-link'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <div>
        <Helmet title={siteTitle} />
        <div>
          <h3>Hello, I'm Anton! 👋</h3>
          <p>
            I'm a web developer from Stockholm, Sweden and I've been passionate
            about programming ever since I discovered that by writing words in a
            certain order, I could tell the computer what to do! 😱 It was just
            like magic! ✨
          </p>
          <p>
            This is my personal site where I try to keep track of my personal{' '}
            <Link to="/projects">projects</Link> and occasionally post stuff on
            my <Link to="/posts">blog</Link>. The posts are usually just a
            slightly edited version of my own notes from learning the subjects,
            and therefore probably not complete neither comprehensive, but
            hopefully, they'll serve a purpose to someone!
          </p>
          <p>
            If you have any questions or just want to talk (or meet up if you're
            ever in Stockholm!), it's easiest to reach me on{' '}
            <a href="">Twitter (@awnton)</a>. 🎉
          </p>
          <p>Have a day full of joy!</p>
        </div>
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`