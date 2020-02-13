import React from 'react'
import Link from 'gatsby-link'
import { useSpring, animated, config } from 'react-spring'
import { useHover } from 'react-use-gesture'
import styled from 'styled-components'

export default function Header({ small }) {
  return (
    <Heading small={small}>
      <Link
        to={'/'}
        style={{
          textDecoration: 'none',
        }}
      >
        <h1>
          {'anton gunnarsson'.split('').map((l, i) => (
            <Letter key={i}>{l}</Letter>
          ))}
        </h1>
      </Link>
    </Heading>
  )
}

const Heading = styled.header`
  font-size: ${props => (props.small ? '1rem' : '1.5rem')};
  text-align: center;

  @media screen and (max-width: 500px) {
    font-size: ${props => (props.small ? '1rem' : '1.2rem')};
  }
`

const Letter = ({ children }) => {
  const c = {
    ...config.wobbly,
    tension: 430,
  }

  const [{ y, color }, set] = useSpring(() => ({
    y: 0,
    color: 'black',
    config: c,
  }))
  const bind = useHover(({ hovering }) =>
    set({ y: hovering ? -20 : 0, color: randomColor() })
  )

  return (
    <span {...bind()} style={{ display: 'inline-block' }}>
      <animated.span
        style={{
          y,
          color,
          display: 'inline-block',
          whiteSpace: 'pre',
        }}
      >
        {children}
      </animated.span>
    </span>
  )
}

const randomColor = () => {
  const colors = [
    '#eab0d9',
    '#a7e9af',
    '#6a8caf',
    '#d45d79',
    '#9dab86',
    '#e6a157',
    '#698474',
    '#d77fa1',
    '#9656a1',
    '#39375b',
    '#f6cd90',
    '#bbeaa6',
    '#e5b0ea',
    '#99d8d0',
    '#9cf196',
    '#f9bcdd',
    '#c36a2d',
    '#7189bf',
    '#9fd3c7',
    '#dbe9b7',
    '#ef6c57',
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}
