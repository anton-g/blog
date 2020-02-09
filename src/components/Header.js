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
  text-align: ${props => (props.small ? 'left' : 'center')};
`

const Letter = ({ children }) => {
  const c = {
    ...config.wobbly,
    tension: 430,
  }

  const [{ y }, set] = useSpring(() => ({ y: 0, config: c }))
  const bind = useHover(({ hovering }) => set({ y: hovering ? -20 : 0 }))

  return (
    <span {...bind()} style={{ display: 'inline-block' }}>
      <animated.span style={{ y, display: 'inline-block', whiteSpace: 'pre' }}>
        {children}
      </animated.span>
    </span>
  )
}
