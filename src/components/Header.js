import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

export default function Header() {
  return (
    <Heading>
      <NavLink to={'/'}>ag</NavLink>
      <Nav>
        <NavLink to="/posts">posts</NavLink>
      </Nav>
    </Heading>
  )
}

const Heading = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px 16px;
  display: flex;
  font-size: 16px;
  font-family: 'Inter';
  font-weight: 300;
`

const Nav = styled.nav`
  margin-left: 16px;
`

const NavLink = styled(Link)`
  text-decoration: none;
  opacity: 0.9;

  &:hover {
    opacity: 1;
  }
`
