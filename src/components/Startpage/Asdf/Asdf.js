import React from 'react'
import styled from 'styled-components'

import img from './ASDF.png'

export default function Asdf() {
  return (
    <StyledAsdf>
      <a href="https://asdf.pizza">
        <img src={img} alt="asdf podcast"></img>
      </a>
    </StyledAsdf>
  )
}

const StyledAsdf = styled.div`
  grid-column-start: 1 span;
  grid-row-start: 1 span;

  width: 100%;
  height: 100%;

  img {
    height: 100%;
    width: 100%;
  }
`
