import React from 'react'
import Link from 'gatsby-link'

class Project extends React.Component {
  render() {
    const title = <Link to={'/'} style={{
      textDecoration: 'none'
    }}>
      anton gunnarsson
    </Link>

    return (
      <div>
        <header>
          { this.props.small ? <h3>{ title }</h3> : <h1>{ title }</h1> }
        </header>
        <nav>
          <Link to={'/'} style={{
            paddingRight: '.5rem'
          }}>Posts</Link>
          <Link to={'/projects'}>Projects</Link>
        </nav>
      </div>
    )
  }
}

export default Project
