import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

class TalksPage extends React.Component {
  render() {
    const talks = [
      {
        name: 'Mob Programming: Everything is better when shared',
        date: '2019-12-11',
        event: {
          name: 'Swenug',
          url: 'https://www.meetup.com/Swenug-Stockholm/events/266611273/',
        },
        link: null,
      },
    ]

    return (
      <Layout location={this.props.location}>
        <SEO title={`talks`} meta={[{ name: 'og:type', content: 'website' }]} />
        <h1>Talks</h1>
        {talks.map(t => (
          <div key={t.date}>
            <span style={{ color: 'gray' }}>{t.date} - </span>
            <span>{t.name} @ </span>
            <a href={t.event.url}>{t.event.name}</a>
          </div>
        ))}
        <hr />
      </Layout>
    )
  }
}

export default TalksPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
