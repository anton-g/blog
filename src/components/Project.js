import React from 'react'
import Tag from './Tag'

class Project extends React.Component {
  render() {
    return (
      <div>
        <h2 style={{
          marginBottom: '.5rem'
        }}>
          { this.props.name }
          <span style={{
            fontSize: '.6em',
            color: 'grey',
            paddingLeft: '.3em'
          }}>{ this.props.year }</span>
        </h2>
        <div style={{
          marginBottom: '1rem'
        }}>
          { this.props.tags.map(tag => <Tag key={tag}>{tag}</Tag>) }
        </div>
        <p>
          { this.props.children }
        </p>
        <div>
          { this.props.links.map(link => (
            <a key={link.url} style={{
              paddingRight: '.5rem'
            }}
            href={link.url}>{link.name}</a>)
          )}
        </div>
      </div>
    )
  }
}

Project.defaultProps = {
  name: '',
  description: '',
  tags: [],
  links: []
}

export default Project
