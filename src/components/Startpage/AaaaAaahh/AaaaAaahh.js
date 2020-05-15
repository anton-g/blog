import React from 'react'
import styled, { keyframes } from 'styled-components'
import BlockWrapper from '../BlockWrapper'
import mouth from './mouth.svg'
import scream from './scream.wav'
import useSound from 'use-sound'

const AaaaAaahh = () => {
  const [play, { isPlaying }] = useSound(scream, { volume: 0.5 })

  return (
    <AaaaAaahhWrapper>
      <Link
        href="https://chrome.google.com/webstore/detail/aaaaaaaahhhhh/kmngmhbkbpdgbhbcnhpknekaplldhdln"
        onMouseEnter={play}
        animate={isPlaying}
      >
        <img alt="mouth" src={mouth} width="60%" height="80%"></img>
      </Link>
    </AaaaAaahhWrapper>
  )
}

export default AaaaAaahh

const AaaaAaahhWrapper = styled(BlockWrapper)`
  grid-column-start: span 2;
  grid-row-start: span 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`

const shake = keyframes`
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
`

const Link = styled.a`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 0.2s ease-in-out;
  transform: scale(${p => (p.animate ? 1.15 : 1)});

  img {
    animation: ${shake} 0.5s infinite;
    animation-play-state: ${p => (p.animate ? 'running' : 'paused')};
  }
`
