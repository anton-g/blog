import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'gatsby'

export default function Blog() {
  return (
    <Wrapper to="/posts">
      <Text first={true}>posts posts posts </Text>
      <Text>posts posts posts </Text>
    </Wrapper>
  )
}

const marquee = keyframes`
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
`

const Text = styled.h2`
  position: absolute;
  animation: ${marquee} 12s linear infinite;
  ${props => (props.first ? 'animation-delay: -6s;' : '')};
  font-family: 'Inter', sans-serif;
  font-size: 4rem;
  margin: 0;
  white-space: pre;
`

const Wrapper = styled(Link)`
  position: relative;
  grid-column-start: span 4;
  grid-row-start: span 1;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;

  :hover {
    ${Text} {
      animation-play-state: paused;
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke: 1px black;
    }
  }
`
