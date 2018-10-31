import React from 'react'

class Project extends React.Component {
  render() {
    return (
      <div style={{
        display: 'inline-block',
        backgroundColor: '#eaeaea',
        color: '#343334',
        borderRadius: '.3em',
        padding: '0 .328rem',
        marginRight: '.5rem',
        fontSize: '.9rem'
      }}>{ this.props.children }</div>
    )
  }
}

export default Project
