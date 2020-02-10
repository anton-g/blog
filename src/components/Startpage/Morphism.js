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
        <Box foo={0.6} style={{ transform: props.xy.interpolate(trans2) }}>
          <Box foo={0.4} style={{ transform: props.xy.interpolate(trans3) }}>
            <Box
              foo={0.2}
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

  width: ${p => `${200 * p.foo}px`};
  height: ${p => `${200 * p.foo}px`};
  border-radius: ${p => `${30 * p.foo}px`};
  box-shadow: 20px 20px 60px #c796b8, -20px -20px 60px #ffcafa;
`

const Bar = styled.div`
  border-radius: 20px;
  width: 60%;
  height: 60%;
  background: #eab0d9;
  box-shadow: 15px 15px 40px #c796b8, -15px -15px 40px #ffcafa;

  display: flex;
  align-items: center;
  justify-content: center;
`

const FooBar = styled.div`
  border-radius: 15px;
  width: 40%;
  height: 40%;
  background: #eab0d9;
  box-shadow: 10px 10px 30px #c796b8, -10px -10px 30px #ffcafa;
`
