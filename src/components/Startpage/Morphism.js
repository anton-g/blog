import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'

const trans = (x, y) => `translate3d(${x / 5}px, ${y / 5}px, 0)`

export default function Morphism() {
  const ref = useRef(null)
  const rect = useRef(null)

  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: config.wobbly,
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
      <Box scale={0.8} style={{ transform: props.xy.to(trans) }}>
        <Box scale={0.7} style={{ transform: props.xy.to(trans) }}>
          <Box scale={0.6} style={{ transform: props.xy.to(trans) }}>
            <Box scale={0.5} style={{ transform: props.xy.to(trans) }}></Box>
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

  width: ${p => `${100 * p.scale}%`};
  height: ${p => `${100 * p.scale}%`};
  border-radius: ${p => `${30 * p.scale}px`};
  box-shadow: 20px 20px 60px #c796b8, -20px -20px 60px #ffcafa;
`
