import React from 'react'
import { Link } from 'gatsby'

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={'/posts'}>Posts</Link>
        </li>
        <li>
          <Link to={'/projects'}>Projects</Link>
        </li>
      </ul>
    </nav>
  )
}
