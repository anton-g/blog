import React, { useState, useRef, useCallback } from 'react'
import { useSpring, animated } from '@react-spring/web'
import styled from 'styled-components'
import useSound from 'use-sound'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { useSoundMode } from '../contexts/SoundContext'
import { trackGoal } from 'fathom-client'

export default function ConfettiCanon() {
  const { soundMode } = useSoundMode()
  const [playPop] = useSound('/sounds/pop.mp3', { volume: 0.5 })
  const [playCharge, { stop }] = useSound('/sounds/fuse.mp3', { volume: 0.15 })

  const refAnimationInstance = useRef<confetti.CreateTypes | null>(null)
  const getInstance = useCallback((instance: confetti.CreateTypes | null) => {
    refAnimationInstance.current = instance
  }, [])
  const [loading, setLoading] = useState(false)
  const height = 120

  const { path } = useSpring({
    path: loading
      ? `M40 0 H50 Q${100} ${80 / 2} 68 ${80} H21 Q${-10} ${80 / 2} 40 0 Z`
      : `M40 0 H50 Q${68} ${height / 2} 68 ${height} H21 Q${20} ${
          height / 2
        } 40 0 Z`,
    config: {
      friction: 12,
      tension: 350,
    },
  })

  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: {
      duration: 2000,
    },
  }))

  const handleMouseDown = () => {
    api.start({
      x: 80,
      immediate: false,
    })
    setLoading(true)
    if (soundMode === true) playCharge()
  }

  const handleMouseUp = () => {
    if (!loading) return

    const percentage = x.get() / 80

    if (refAnimationInstance.current) {
      refAnimationInstance.current({
        angle: 55,
        spread: lerp(25, 70, percentage),
        startVelocity: lerp(10, 55, percentage),
        particleCount: lerp(20, 200, percentage),
        ticks: lerp(100, 200, percentage),
        gravity: 0.7,
        origin: { x: 0, y: 0.77 },
        colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
      })
    }

    api.start({
      x: 0,
      immediate: true,
    })
    setLoading(false)
    stop()
    if (soundMode === true) playPop()
    trackGoal('GPLPLS3A', 0)
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
      <ReactCanvasConfetti
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          width: 765,
          maxWidth: '85vw',
          height: '150vh',
          bottom: '-25vh',
          left: '36px',
          overflow: 'hidden',
          userSelect: 'none',
          // backgroundColor: 'red',
        }}
        refConfetti={getInstance}
      />
      <svg
        width="90"
        height="120"
        viewBox="0 0 90 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ userSelect: 'none' }}
      >
        <mask id="myMask">
          <animated.path d={path} fill="#C4C4C4" stroke="black" />
        </mask>
        <animated.path d={path} fill="#C4C4C4" stroke="black" />
        <animated.path
          d={x.to((x) => `M0 0 H100 V${x} H0 V0`)}
          fill="red"
          stroke="red"
          mask="url(#myMask)"
        />
      </svg>
    </CannonWrapper>
  )
}

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
    transform: rotateZ(210deg) scale(0.7);
  }
`

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a
