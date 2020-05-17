import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'

export default function Test() {
  const [loading, setLoading] = useState(false)
  const height = 120

  const { path } = useSpring({
    path: loading
      ? `M21 0 H68 Q${100} ${80 / 2} 68 ${80} H21 Q${-10} ${80 / 2} 21 0 Z`
      : `M21 0 H68 Q${68} ${height / 2} 68 ${height} H21 Q${20} ${height /
          2} 21 0 Z`,
    config: {
      friction: 12,
      tension: 350,
    },
  })

  const [{ x }, set] = useSpring(() => ({
    x: 0,
    config: {
      duration: 1000,
    },
  }))

  const handleMouseDown = () => {
    set({
      x: 80,
      immediate: false,
    })
    setLoading(true)
  }

  const handleMouseUp = () => {
    set({
      x: 0,
      immediate: true,
    })
    setLoading(false)
  }

  return (
    <div>
      <svg
        style={{ transform: 'rotateZ(120deg) scale(0.4)' }}
        width="90"
        height="120"
        viewBox="0 0 90 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
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
    </div>
  )
}
