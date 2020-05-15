import React from 'react'
import styled from 'styled-components'

export default function Todo() {
  return (
    <StyledTodo>
      <h2>todo</h2>
      <ul>
        <li>Respect prefers-reduced-motion</li>
        <li>Add toggle for sounds</li>
        <li>Dark mode</li>
        <li>Fix horrible perf :)</li>
      </ul>
    </StyledTodo>
  )
}

const StyledTodo = styled.div`
  grid-column-start: 2 span;
  grid-row-start: 1 span;

  background-color: white;

  width: 100%;
  height: 100%;

  overflow-y: scroll;

  font-size: 12px;

  h2 {
    margin: 0;
    padding: 4px;
  }

  ul {
    margin: 0;
    padding-left: 24px;
    list-style-type: circle;
  }

  li {
    padding-bottom: 4px;
  }
`
