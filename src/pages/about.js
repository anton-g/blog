import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'

class AboutPage extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <div>
        <Helmet title={`${siteTitle} | about`} />
        <h1>About</h1>
        <div>
          <h3>Hello, I'm Anton! 👋</h3>
          <p>
            I'm a full stack-developer from Stockholm, Sweden and I've been
            passionate about programming ever since I discovered that by writing
            words in a certain order, I could tell the computer what to do! 😱
            It was just like magic! ✨
          </p>
          <p>
            This is my personal site where I try to show off my personal
            projects and occasionally posts on the blog. The posts are usually
            just a slighty edited version of my own notes from learning the
            subjects, and therefore probably not complete neither comprehensive,
            but hopefully they'll serve a purpose to someone!
          </p>
          <p>
            If you have any questions or just want to talk (or meet up if you're
            ever in Stockholm!), it's easiest to reach me on{' '}
            <a href="">Twitter (@awnton)</a>. 🎉
          </p>
          <p>Have a wonderful day!</p>
        </div>
        <hr />
      </div>
    )
  }
}

export default AboutPage

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
