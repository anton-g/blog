import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { DarkToggle } from './common/DarkToggle'

export default function Header() {
  return (
    <Heading>
      <NavLink to={'/'}>ag</NavLink>
      <Nav>
        <NavLink to="/posts">posts</NavLink>
        <RightSide>
          <DarkToggle></DarkToggle>
        </RightSide>
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
  width: 100%;
  box-sizing: border-box;
`

const Nav = styled.nav`
  margin-left: 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
`

const NavLink = styled(Link)`
  text-decoration: none;
  opacity: 0.9;

  &:hover {
    opacity: 1;
  }
`

const RightSide = styled.div`
  margin-left: auto;
`
