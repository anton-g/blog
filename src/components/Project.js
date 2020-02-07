import React from 'react'
import Tag from './Tag'

class Project extends React.Component {
  render() {
    return (
      <div>
        <h2>
          {this.props.name}
          {/* <span>{this.props.year}</span> */}
        </h2>
        {/* <div>
          {this.props.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div> */}
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
