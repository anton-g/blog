import React from 'react'
import styled from 'styled-components'

export default function Visitors() {
  return (
    <StyledVisitors>
      <img
        width="80%"
        src="https://antongunnarsson-counter.glitch.me/counter.svg"
        alt="number of visitors"
        crossOrigin="anonymous"
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

  background-color: #f4efd3;

  width: 100%;
  height: 100%;
`
