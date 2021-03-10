import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { DarkToggle } from './common/DarkToggle/DarkToggle'
import { SoundToggle } from './common/SoundToggle/SoundToggle'

export default function Header() {
  return (
    <Heading>
      <NavLink to={'/'}>ag</NavLink>
      <Nav>
        <NavLink to="/posts">posts</NavLink>
        <RightSide>
          <SoundToggle></SoundToggle>
          <DarkToggle></DarkToggle>
          <RssLink href="/rss.xml" aria-label="RSS">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </RssLink>
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
  display: flex;

  > *:not(:last-child) {
    margin-right: 1rem;
  }
`

const RssLink = styled.a`
  display: flex;
  align-items: center;
  color: var(--color-text);
  outline: none;

  svg {
    height: 20px;
    width: 20px;
  }
`
