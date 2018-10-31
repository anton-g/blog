import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Project from '../components/Project'

class ProjectsPage extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    const projects = [
      {
        name: 'Quizify',
        year: '2018',
        tags: ['Vue', 'NestJS', 'SocketIO', 'Spotify'],
        links: [
          { url: 'https://qzfy.se', name: 'Quizify' },
          { url: 'https://github.com/anton-g/quizify', name: 'GitHub' }
        ],
        description: `Quizify is a local multiplayer real time music intro quiz, with a Spotify integration for controlling the music. One player acts as the host and other players can join by using their own devices as "buzzers". It features real time communication, internationalization, automatic generation of quiz questions using players own Spotify playlists and much more. It's built with Vue, NestJS and a MongoDB database.`
      },
      {
        name: 'Still in beta',
        year: '2016 -',
        tags: ['Podcast'],
        links: [{ url: 'http://stillinbeta.se', name: 'Still in beta' }],
        description: `Still in beta is a swedish podcast hosted by me and two friends. Started when we graduated from university we talk about our experiences as newly minted developers.`
      },
      {
        name: 'Charades',
        year: '2015',
        tags: ['iOS', 'ObjC'],
        description: `An app that generated random charades by combining different sentence structures with random adjectives, verbs, substantives and persons.`
      },
      {
        name: 'Quadrate',
        year: '2014',
        tags: ['Game', 'iOS', 'ObjC'],
        description: `Quadrate was a arcade game developed for the iOS platform. You played as a small floating cube trying to avoid falling debris while collecting powerups.`
      }
    ]

    return (
      <div>
        <Helmet title={`${siteTitle} | projects`} />
        <h1>Projects</h1>
        <div className="projects">
          { projects.map(p => <Project key={p.name} name={p.name} year={p.year} tags={p.tags} links={p.links}>{p.description}</Project>)}
        </div>
        <hr/>
      </div>
    )
  }
}

export default ProjectsPage

export const pageQuery = graphql`
  query ProjectsQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
