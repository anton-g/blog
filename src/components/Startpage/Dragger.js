import React from 'react'
import styled from 'styled-components'
import { useDrag } from 'react-use-gesture'
import { useSpring, to, animated } from 'react-spring'
import { scale } from 'vec-la'
import bear from './bear.webp'

export default function Dragger() {
  const [{ pos }, set] = useSpring(() => ({ pos: [0, 0] }))

  const bind = useDrag(
    ({ down, movement: pos, velocity, direction }) => {
      set({
        pos,
        immediate: down,
        config: { velocity: scale(direction, velocity), decay: true },
      })
    },
    { initial: () => pos.get() }
  )

  return (
    <StyledDragger>
      <Cover
        {...bind()}
        style={{
          transform: to([pos], ([x, y]) => `translate3d(${x}px,${y}px,0)`),
        }}
      ></Cover>
    </StyledDragger>
  )
}

const StyledDragger = styled.div`
  grid-column-start: span 1;
  grid-row-start: span 1;

  background-image: url('${bear}');
  background-position: center;
  background-size: cover;
`

const Cover = styled(animated.div)`
  background-color: palevioletred;
  width: 100%;
  height: 100%;
  will-change: transform;

  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`
