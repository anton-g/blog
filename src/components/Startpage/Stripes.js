import React, { useRef } from 'react'
import styled from 'styled-components'
import { useGesture } from 'react-use-gesture'
import { useSpring, animated, config } from 'react-spring'

export default function Stripes({ width, height }) {
  const ref = useRef(null)
  const center = useRef({})

  const [props, set] = useSpring(() => ({
    background: getBackgroundStyle(63),
    backgroundSize: '20px 60px',
    config: config.molasses,
  }))

  const degrees = (px, py) => {
    const degrees =
      (Math.atan2(center.current.y - py, center.current.x - px) * 180) / Math.PI
    return degrees
  }

  const bind = useGesture({
    onHover: ({ hovering }) => {
      if (!hovering) set({ background: getBackgroundStyle(63) })
    },
    onMove: ({ first, last, xy: [px, py] }) => {
      if (first)
        center.current = getCenterPoint(ref.current.getBoundingClientRect())

      if (last) return

      set({ background: getBackgroundStyle(degrees(px, py)) })
    },
  })

  return (
    <StyledStripes
      ref={ref}
      {...bind()}
      style={props}
      width={width}
      height={height}
    ></StyledStripes>
  )
}

const getBackgroundStyle = deg => `
linear-gradient(${deg}deg, #ffdcdc 23%, transparent 23%) 7px 0,
    linear-gradient(${deg}deg, transparent 74%, #ffdcdc 78%),
    linear-gradient(${deg}deg, transparent 34%, #ffdcdc 38%, #ffdcdc 58%, transparent 62%),
    transparent
`

const getCenterPoint = rect => ({
  x: rect.x + rect.width / 2,
  y: rect.y + rect.height / 2,
})

const StyledStripes = styled(animated.div)`
  grid-column-start: span ${props => props.width};
  grid-row-start: span ${props => props.height};

  background: linear-gradient(63deg, #ffdcdc 23%, transparent 23%) 7px 0,
    linear-gradient(63deg, transparent 74%, #ffdcdc 78%),
    linear-gradient(
      63deg,
      transparent 34%,
      #ffdcdc 38%,
      #ffdcdc 58%,
      transparent 62%
    ),
    transparent;
  background-size: 20px 60px;
`
