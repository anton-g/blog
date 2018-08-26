import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

// import profilePic from './profile-pic.jpg'

class Bio extends React.Component {
  render() {
    return (
      <div style={{
        marginBottom: '3rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/*<img
          src={profilePic}
          alt={`Anton Gunnarsson`}
        />*/}
        <p style={{ margin: 0, paddingLeft: '1em' }}>
          Written by <strong>Anton Gunnarsson</strong>. He lives in Stockholm and works with stuff on the internet.{' '}
          <a href="https://twitter.com/awnton">
            You should follow him on Twitter.
          </a>
        </p>
      </div>
    )
  }
}

export default Bio
