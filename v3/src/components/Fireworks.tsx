import { useCallback, useEffect, useRef } from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { CSSProperties } from 'react'

export function Fireworks() {
  const refAnimationInstance = useRef<confetti.CreateTypes | null>(null)
  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance
  }, [])

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3))
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9))
    }
  }, [])

  useEffect(() => {
    setTimeout(nextTickAnimation, 400)
    setTimeout(nextTickAnimation, 1000)
    setTimeout(nextTickAnimation, 1600)
    setTimeout(nextTickAnimation, 2200)
  }, [nextTickAnimation])

  return <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
}
function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}
const canvasStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
}
function getAnimationSettings(originXA: number, originXB: number) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  }
}
