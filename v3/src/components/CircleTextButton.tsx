// https://codepen.io/essingen123/pen/mYwoNQ

import { animated, config, useSpring } from '@react-spring/web'
import { useRef } from 'react'
import { useContext, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import useSound from 'use-sound'
import { SoundContext } from '../SoundContext'
import clickDown from '../sounds/clickDown.mp3'
import clickUp from '../sounds/clickUp.mp3'
import useDimensions from '../hooks/useDimensions'

const AnimFeDisplacementMap = animated('feDisplacementMap')

const target = 1
export const CircleTextButton = () => {
  const [playClickDown] = useSound(clickDown)
  const [playClickUp] = useSound(clickUp)
  const { soundMode } = useContext(SoundContext)
  const [turbulenceScale, setTurbulenceScale] = useState(0)
  const [clicks, setClicks] = useState(0)
  const timeoutRef = useRef<any>(null)
  const timeRef = useRef<number>(0)
  const [ref, dimensions] = useDimensions()

  const { scale } = useSpring({
    scale: turbulenceScale,
    config: config.wobbly,
  })

  const handleMouseDown = () => {
    soundMode && playClickDown()
    timeRef.current = Date.now()
  }

  const handleMouseUp = () => {
    soundMode && playClickUp()
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (Date.now() - timeRef.current > 1750) {
      setClicks((c) => c + 1)
      setTurbulenceScale((s) => (s === 0 ? 50 : s * 1.3))
    }

    timeRef.current = 0

    if (clicks >= target - 1) return

    timeoutRef.current = setTimeout(() => {
      setTurbulenceScale(0)
      setClicks(0)
    }, 10000)
  }

  return (
    <Container>
      {clicks >= target && <HiddenParty />}
      <Circle>
        <Button
          ref={ref}
          onMouseDown={() => handleMouseDown()}
          onMouseUp={() => handleMouseUp()}
          onTouchStart={() => handleMouseDown()}
          onTouchEnd={() => handleMouseUp()}
        >
          The Button
        </Button>
        <Svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="300px"
          height="300px"
          viewBox="0 0 300 300"
          xmlSpace="preserve"
          overflow="visible"
        >
          <defs>
            <path id="circlePath" d="M 150, 150 m -120, 0 a 120,120 0 0,1 240,0 a 120,120 0 0,1 -240,0 " fill="none" />
            <filter id="filter">
              <feTurbulence
                id="turbulence"
                type="fractalNoise"
                baseFrequency="0.002"
                numOctaves="5"
                result="NOISE"
                seed={'4432'}
              ></feTurbulence>
              <feGaussianBlur in="SourceGraphic" result="BLURRED" stdDeviation="0"></feGaussianBlur>
              <AnimFeDisplacementMap
                id="displacer"
                in2="NOISE"
                in="BLURRED"
                scale={scale}
                xChannelSelector="R"
                yChannelSelector="R"
                result="DISPLACED"
              ></AnimFeDisplacementMap>
            </filter>
          </defs>
          <circle cx="150" cy="150" r="150" fill="none" />
          <g>
            <use xlinkHref="#circlePath" fill="none" />
            <text fill="currentColor" filter="url(#filter)">
              <textPath xlinkHref="#circlePath">I PROMISE YOU THIS BUTTON DOES SOMETHING, REALLY 🤞</textPath>
            </text>
          </g>
        </Svg>
      </Circle>
    </Container>
  )
}

const Container = styled.div`
  margin: -6px;
  overflow: visible;
  position: relative;
`

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0);
  }
`

const Svg = styled.svg`
  position: absolute;
  height: 100%;
  width: 100%;
  pointer-events: none;
`

const Button = styled.button`
  background: ${({ theme }) => theme.colors.gray12};
  border: 2px solid ${({ theme }) => theme.colors.gray12};
  color: ${({ theme }) => theme.colors.gray1};
  font-family: 'Yeseva One';
  font-size: 22px;
  border-radius: 8px;
  cursor: pointer;
  align-self: center;
  padding: 12px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 300ms cubic-bezier(0, 0, 0.58, 1), background 300ms cubic-bezier(0, 0, 0.58, 1);
  cursor: pointer;
  vertical-align: middle;

  &:hover {
    transform: translate(0, -0.5em);
    &::before {
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.gray12}, 0 0.5em 0 0 ${({ theme }) => theme.colors.gray6};
      transform: translate3d(0, 0.5em, -1em);
    }
  }

  &:active {
    transform: translate(0em, 0em);
    transition-duration: 75ms;

    &::before {
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.gray12}, 0 0 ${({ theme }) => theme.colors.gray6};
      transform: translate3d(0, 0, -1px);
      transition-duration: 75ms;
    }
  }

  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.gray11};
    border-radius: inherit;
    transform: translateZ(-1px);
    transition: transform 300ms cubic-bezier(0, 0, 0.58, 1), box-shadow 300ms cubic-bezier(0, 0, 0.58, 1);
    box-sizing: border-box;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.gray12}, 0 0 ${({ theme }) => theme.colors.gray6};
  }
`

const Circle = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  overflow: visible;
  display: flex;
  align-content: center;
  justify-content: center;

  text {
    font-family: 'Helvetica Neue', Arial;
    font-size: 24px;
    font-weight: bold;
    color: black;
  }

  ${Svg} {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    animation-name: ${rotate};
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`

const path2 =
  'M16.8,-21.4C25.6,-8,39.1,-4,48.6,9.4C58,22.9,63.3,45.7,54.5,58C45.7,70.4,22.9,72.2,9.9,62.3C-3,52.4,-6.1,30.8,-16.5,18.4C-27,6.1,-44.8,3,-50.7,-5.8C-56.5,-14.7,-50.3,-29.4,-39.9,-42.9C-29.4,-56.3,-14.7,-68.5,-5.4,-63.2C4,-57.8,8,-34.9,16.8,-21.4Z'
const path4 = `M53.3,-45.8C67.2,-39.4,75.4,-19.7,71.1,-4.3C66.7,11.1,49.9,22.1,36,32.1C22.1,42.1,11.1,51,-5.5,56.5C-22.1,62.1,-44.2,64.2,-57.2,54.2C-70.1,44.2,-73.7,22.1,-71.2,2.5C-68.7,-17.1,-60,-34.2,-47.1,-40.7C-34.2,-47.1,-17.1,-42.9,1.3,-44.2C19.7,-45.5,39.4,-52.3,53.3,-45.8Z`
const path1 =
  'M33.2,-34.1C35.5,-30.8,24.7,-15.4,17.6,-7.2C10.4,1.1,6.9,2.2,4.5,8.8C2.2,15.3,1.1,27.3,-10.1,37.4C-21.2,47.5,-42.5,55.6,-48.3,49C-54.2,42.5,-44.7,21.2,-35.1,9.6C-25.4,-2,-15.7,-3.9,-9.8,-7.1C-3.9,-10.4,-2,-14.9,6.7,-21.6C15.4,-28.3,30.8,-37.3,33.2,-34.1Z'
const path3 =
  'M49.6,-45.6C62.2,-37,68.9,-18.5,69.4,0.5C69.9,19.5,64.2,39,51.6,53.7C39,68.3,19.5,78.2,-1.1,79.3C-21.8,80.4,-43.5,72.8,-55.5,58.2C-67.6,43.5,-69.9,21.8,-67.1,2.8C-64.3,-16.1,-56.3,-32.2,-44.3,-40.8C-32.2,-49.4,-16.1,-50.4,1.2,-51.6C18.5,-52.8,37,-54.2,49.6,-45.6Z'

const HiddenParty = () => {
  return (
    <>
      <Wrapper>hello hello hello</Wrapper>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <defs>
          <clipPath id="maskTitle" clipPathUnits="objectBoundingBox">
            <motion.path
              fill="white"
              d={path1}
              style={{
                transform: 'translate(0.5 0.5) scale(0.0065)',
                originX: '0.5',
                originY: '0.5',
              }}
              animate={{
                d: [path1, path1, path2, path3, path4],
                scale: [0, 0.003, 0.004, 0.0055, 0.0065],
              }}
              transition={{
                // delay: 2,
                // repeat: Infinity,
                ease: 'circOut',
                duration: 4,
                times: [0, 0.3, 0.5, 0.75, 1],
              }}
            />
          </clipPath>
        </defs>
      </svg>
    </>
  )
}

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(/party-bg.svg);
  background-size: contain;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: -200px;
  z-index: 3;
  clip-path: url(#maskTitle);
`

const BackgroundAnimation = ({ x, y }: { x?: number; y?: number }) => {
  const scrollDiff = typeof window !== 'undefined' ? window.scrollY : 0

  return (
    <BackgroundSvg fill="lime" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        fill="#FF0066"
        d={path1}
        animate={{ d: [path1, path2] }}
        transform={`translate(${x || 0} ${(y || 0) + scrollDiff})`} // + scroll?
        transition={{
          // repeat: Infinity,
          // ease: 'easeInOut',
          duration: 6,
          times: [0, 1],
        }}
      />
    </BackgroundSvg>
  )
}

const BackgroundSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100%;
  z-index: -1;
`
