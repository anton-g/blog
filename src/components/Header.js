import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

export default function Header() {
  return (
    <Heading>
      <Link
        to={'/'}
        style={{
          textDecoration: 'none',
        }}
      >
        anton gunnarsson
      </Link>
    </Heading>
  )
}

const Heading = styled.header`
  font-size: 14px;
`
