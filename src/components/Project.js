import React from 'react'

class Project extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <p>{this.props.children}</p>
        <div>
          {this.props.links.map(link => (
            <a key={link.url} href={link.url}>
              {link.name}
            </a>
          ))}
        </div>
      </div>
    )
  }
}

Project.defaultProps = {
  name: '',
  description: '',
  tags: [],
  links: [],
}

export default Project
