import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import Confetti from 'react-dom-confetti'
import styled from 'styled-components'
import useSound from 'use-sound'
import pop from './pop.mp3'
import charge from './charge.mp3'

export default function ConfettiCanon() {
  const [playPop] = useSound(pop, { volume: 0.5 })
  const [playCharge, { stop }] = useSound(charge, { volume: 0.4 })

  const [loading, setLoading] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [confettiConfig, setConfettiConfig] = useState({
    angle: 60,
    spread: 25,
    startVelocity: 10,
    elementCount: 20,
    dragFriction: 0.1,
    duration: 1000,
    stagger: 0,
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  })
  const height = 120

  const { path } = useSpring({
    path: loading
      ? `M40 0 H50 Q${100} ${80 / 2} 68 ${80} H21 Q${-10} ${80 / 2} 40 0 Z`
      : `M40 0 H50 Q${68} ${height / 2} 68 ${height} H21 Q${20} ${height /
          2} 40 0 Z`,
    config: {
      friction: 12,
      tension: 350,
    },
  })

  const [{ x }, set] = useSpring(() => ({
    x: 0,
    config: {
      duration: 2000,
    },
  }))

  const handleMouseDown = () => {
    set({
      x: 80,
      immediate: false,
    })
    setLoading(true)
    setConfetti(false)
    playCharge()
  }

  const handleMouseUp = () => {
    if (!loading) return

    const percentage = x.get() / 80

    setConfettiConfig(c => ({
      ...c,
      ...{
        spread: lerp(25, 60, percentage),
        startVelocity: lerp(10, 45, percentage),
        elementCount: lerp(20, 120, percentage),
        // dragFriction: 0.1,
        duration: lerp(1000, 2000, percentage),
      },
    }))

    set({
      x: 0,
      immediate: true,
    })
    setLoading(false)
    setConfetti(true)
    stop()
    playPop()
  }

  return (
    <CannonWrapper
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
    >
      <StyledConfetti active={confetti} config={confettiConfig} />
      <svg
        width="90"
        height="120"
        viewBox="0 0 90 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="myMask">
          <animated.path d={path} fill="#C4C4C4" stroke="black" />
        </mask>
        <animated.path d={path} fill="#C4C4C4" stroke="black" />
        <animated.path
          d={x.to(x => `M0 0 H100 V${x} H0 V0`)}
          fill="red"
          stroke="red"
          mask="url(#myMask)"
        />
      </svg>
    </CannonWrapper>
  )
}

const StyledConfetti = styled(Confetti)`
  z-index: 999999;
  position: absolute !important;
  top: 25%;
`

const CannonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: min-content;
  height: min-content;
  cursor: pointer;
  user-select: none;

  svg {
    transform: rotateZ(210deg) scale(0.5);
    transition: transform 0.2s;
  }

  &:hover svg {
    transform: rotateZ(210deg) scale(0.55);
  }
`

const lerp = (x, y, a) => x * (1 - a) + y * a
