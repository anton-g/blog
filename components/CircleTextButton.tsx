import { animated, config, useSpring } from '@react-spring/web'
import { useRef } from 'react'
import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import useSound from 'use-sound'
import { useSoundMode } from '../contexts/SoundContext'

const AnimFeDisplacementMap = animated('feDisplacementMap')

const target = 8
const clickTimeout = 950
export const CircleTextButton = ({ onSuccess }: { onSuccess: () => void }) => {
  const [playClickDown] = useSound('/sounds/clickDown.mp3')
  const [playClickUp] = useSound('/sounds/clickUp.mp3')
  const { soundMode } = useSoundMode()
  const [turbulenceScale, setTurbulenceScale] = useState(0)
  const [clicks, setClicks] = useState(0)
  const timeoutRef = useRef<any>(null)
  const timeRef = useRef<number>(0)

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

    const clickDiff = Date.now() - timeRef.current
    const newClicks = clicks + 1
    if (clickDiff > clickTimeout) {
      setClicks(newClicks)
      setTurbulenceScale((s) => (s === 0 ? 50 : s * 1.3))

      if (newClicks >= target) {
        setTurbulenceScale(0)
        setClicks(0)
        onSuccess()
        return
      }
    }

    timeRef.current = 0

    timeoutRef.current = setTimeout(() => {
      setTurbulenceScale(0)
      setClicks(0)
    }, 10000)
  }

  return (
    <Container>
      <Circle>
        <Button
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
            <path
              id="circlePath"
              d="M 150, 150 m -120, 0 a 120,120 0 0,1 240,0 a 120,120 0 0,1 -240,0 "
              fill="none"
            />
            <filter id="filter">
              <feTurbulence
                id="turbulence"
                type="fractalNoise"
                baseFrequency="0.002"
                numOctaves="5"
                result="NOISE"
                seed={'4432'}
              ></feTurbulence>
              <feGaussianBlur
                in="SourceGraphic"
                result="BLURRED"
                stdDeviation="0"
              ></feGaussianBlur>
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
              <textPath xlinkHref="#circlePath">
                I PROMISE YOU THIS BUTTON DOES SOMETHING, REALLY 🤞
              </textPath>
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
  background: var(--color-gray12);
  border: 2px solid var(--color-gray12);
  color: var(--color-gray1);
  font-family: var(--font-yeseva);
  font-size: 22px;
  border-radius: 8px;
  cursor: pointer;
  align-self: center;
  padding: 12px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 300ms cubic-bezier(0, 0, 0.58, 1),
    background 300ms cubic-bezier(0, 0, 0.58, 1);
  cursor: pointer;
  vertical-align: middle;
  &:hover {
    transform: translate(0, -0.5em);
    &::before {
      box-shadow: 0 0 0 2px var(--color-gray12), 0 0.5em 0 0 var(--color-gray6);
      transform: translate3d(0, 0.5em, -1em);
    }
  }
  &:active {
    transform: translate(0em, 0em);
    transition-duration: 75ms;
    &::before {
      box-shadow: 0 0 0 2px var(--color-gray12), 0 0 var(--color-gray6);
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
    background: var(--color-gray11);
    border-radius: inherit;
    transform: translateZ(-1px);
    transition: transform 300ms cubic-bezier(0, 0, 0.58, 1),
      box-shadow 300ms cubic-bezier(0, 0, 0.58, 1);
    box-sizing: border-box;
    box-shadow: 0 0 0 2px var(--color-gray12), 0 0 var(--color-gray6);
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
