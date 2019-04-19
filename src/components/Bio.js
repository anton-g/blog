import React from 'react'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          marginBottom: '3rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p style={{ margin: 0, paddingLeft: '1em' }}>
          Written by me, <strong>Anton Gunnarsson</strong>. I live in Stockholm
          and work at <a href="https://mpyadigital.com">Mpya Digital</a>. Reach
          out with any questions on{' '}
          <a href="https://twitter.com/awnton">Twitter.</a>
        </p>
      </div>
    )
  }
}

export default Bio
