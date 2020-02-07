import React from 'react'
import Link from 'gatsby-link'

class Project extends React.Component {
  render() {
    const title = (
      <Link
        to={'/'}
        style={{
          textDecoration: 'none',
        }}
      >
        anton gunnarsson
      </Link>
    )

    return (
      <header>{this.props.small ? <h3>{title}</h3> : <h1>{title}</h1>}</header>
    )
  }
}

export default Project
