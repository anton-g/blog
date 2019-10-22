import React from 'react'
import get from 'lodash/get'
import Project from '../components/Project'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

class ProjectsPage extends React.Component {
  render() {
    const projects = [
      {
        name: '🎭 Charadgeneratorn',
        year: '2019',
        tags: ['React'],
        links: [{ url: 'https://charades.netlify.com', name: 'Charades' }],
        description: `A web app that generates random charades in Swedish by combining different sentence structures with random adjectives, verbs, substantives and persons. Originally written as an iOS app in 2015 but converted to React in 2019.`,
      },
      {
        name: '❓ Quizify',
        year: '2018',
        tags: ['Vue', 'NestJS', 'SocketIO', 'Spotify'],
        links: [
          { url: 'https://play-quizify.herokuapp.com', name: 'Quizify' },
          { url: 'https://github.com/anton-g/quizify', name: 'GitHub' },
        ],
        description: `Quizify is a local multiplayer real time music intro quiz, with a Spotify integration for controlling the music. One player acts as the host and other players can join by using their own devices as "buzzers". It features real time communication, internationalization, automatic generation of quiz questions using players own Spotify playlists and much more. It's built with Vue, NestJS and a MongoDB database.`,
      },
      {
        name: '🎙 Still in beta',
        year: '2016 - 2018',
        tags: ['Podcast'],
        links: [{ url: 'http://stillinbeta.se', name: 'Still in beta' }],
        description: `Still in beta was a swedish podcast hosted by me and two friends. Started when we graduated from university, we talk about our experiences as newly minted developers.`,
      },
      {
        name: '🕹 Quadrate',
        year: '2014',
        tags: ['Game', 'iOS', 'ObjC'],
        description: `Quadrate was a arcade game developed for the iOS platform. You played as a small floating cube trying to avoid falling debris while collecting powerups.`,
      },
    ]

    return (
      <Layout location={this.props.location}>
        <SEO title={`projects`} />
        <h1>Projects</h1>
        <div className="projects">
          {projects.map(p => (
            <Project
              key={p.name}
              name={p.name}
              year={p.year}
              tags={p.tags}
              links={p.links}
            >
              {p.description}
            </Project>
          ))}
        </div>
        <hr />
      </Layout>
    )
  }
}

export default ProjectsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
