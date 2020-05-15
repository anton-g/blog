import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

export default function Text() {
  return (
    <StyledText>
      <Link to="/software-development-is-a-social-profession">
        Software development is a social profession
      </Link>
    </StyledText>
  )
}

const StyledText = styled.div`
  grid-column-start: 2 span;
  grid-row-start: 1 span;

  background-color: #e4508f;

  width: 100%;
  height: 100%;

  overflow: hidden;

  display: flex;
  align-items: center;

  a {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    padding: 0;
    line-height: 0.7;
    mix-blend-mode: darken;
    text-decoration: none;
    color: #560764;
    text-align: right;
    height: 100%;
    width: 100%;
    white-space: pre-wrap;
    transition: filter 0.3s;
  }

  &:hover a {
    filter: blur(3px);
  }
`
