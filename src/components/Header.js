import React from 'react'
import Link from 'gatsby-link'
import { useSpring, animated, config } from 'react-spring'
import { useHover } from 'react-use-gesture'

export default function Header({ small }) {
  const title = (
    <Link
      to={'/'}
      style={{
        textDecoration: 'none',
      }}
    >
      {'anton gunnarsson'.split('').map((l, i) => (
        <Letter key={i}>{l}</Letter>
      ))}
    </Link>
  )

  return <header>{small ? <h3>{title}</h3> : <h1>{title}</h1>}</header>
}

const Letter = ({ children }) => {
  const c = {
    ...config.wobbly,
    tension: 430,
  }

  const [{ y }, set] = useSpring(() => ({ y: 0, config: c }))
  const bind = useHover(({ hovering }) => set({ y: hovering ? -20 : 0 }))

  return (
    <div {...bind()} style={{ display: 'inline-block' }}>
      <animated.div style={{ y, display: 'inline-block', whiteSpace: 'pre' }}>
        {children}
      </animated.div>
    </div>
  )
}
