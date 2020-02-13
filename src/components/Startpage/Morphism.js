import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

const trans1 = (x, y) => `translate3d(${x / 5}px, ${y / 5}px, 0)`
const trans2 = (x, y) => `translate3d(${x / 8}px, ${y / 8}px, 0)`
const trans3 = (x, y) => `translate3d(${x / 12}px, ${y / 12}px, 0)`
const trans4 = (x, y) => `translate3d(${x / 15}px, ${y / 15}px, 0)`

export default function Morphism() {
  const ref = useRef(null)
  const rect = useRef(null)

  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))

  const calc = (x, y) => {
    if (!rect.current) rect.current = ref.current.getBoundingClientRect()
    return [
      x - rect.current.x - rect.current.width / 2,
      y - rect.current.y - rect.current.height / 2,
    ]
  }

  return (
    <Background
      ref={ref}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
      onMouseOut={() =>
        set({
          xy: calc(
            rect.current.x + rect.current.width / 2,
            rect.current.y + rect.current.height / 2
          ),
        })
      }
    >
      <Box foo={0.8} style={{ transform: props.xy.interpolate(trans1) }}>
        <Box foo={0.7} style={{ transform: props.xy.interpolate(trans2) }}>
          <Box foo={0.6} style={{ transform: props.xy.interpolate(trans3) }}>
            <Box
              foo={0.5}
              style={{ transform: props.xy.interpolate(trans4) }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </Background>
  )
}

const Background = styled.div`
  grid-column-start: 2 span;
  grid-row-start: 2 span;
  background: #eab0d9;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
`

const Box = styled(animated.div)`
  background: #eab0d9;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;

  width: ${p => `${100 * p.foo}%`};
  height: ${p => `${100 * p.foo}%`};
  border-radius: ${p => `${30 * p.foo}px`};
  box-shadow: 20px 20px 60px #c796b8, -20px -20px 60px #ffcafa;
`
