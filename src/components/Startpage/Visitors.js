import React from 'react'
import styled from 'styled-components'

export default function Visitors() {
  return (
    <StyledVisitors>
      <img
        width="80%"
        src="https://antongunnarsson-counter.glitch.me/counter.svg"
      />
    </StyledVisitors>
  )
}

const StyledVisitors = styled.div`
  grid-column-start: 1 span;
  grid-row-start: 1 span;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ffd5e5;

  width: 100%;
  height: 100%;
`
