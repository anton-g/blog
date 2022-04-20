import { useSpring, animated, config } from '@react-spring/web'
import { useState } from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import styled from 'styled-components'
import useDimensions from '../hooks/useDimensions'

export const MainHeading = () => {
  const [popped, setPopped] = useState(false)
  const [size, setSize] = useState(1)
  const [ref, dimensions] = useDimensions()

  const [styles, api] = useSpring(() => ({
    fontSize: `${size}em`,
    onRest: () => {
      api.start({ fontSize: `1em` })
      setSize(1)
    },
    config: config.wobbly,
  }))

  const left = (dimensions?.left || 0) + (dimensions?.width || 0) / 2
  const top = (dimensions?.top || 0) - (dimensions?.height || 0) / 2
  const x = left / (process.browser ? window.innerWidth : 1)
  const y = top / (process.browser ? window.innerHeight : 1)

  return (
    <Title>
      anton{' '}
      <LastName style={{ whiteSpace: 'nowrap' }}>
        gunnarss
        <LetterO ref={ref}>
          o
          {!popped && (
            <Balloon
              onClick={() => {
                let change = 0.5
                if (size > 2.2) change = 0.4
                if (size > 3.8) change = 0.3
                if (size > 5) change = 0.15
                if (size > 6.6) change = 0.1
                if (size > 7.6) setPopped(true)
                setSize((s) => s + change)
                api.start({ fontSize: `${size + change}em` })
              }}
              style={styles}
            >
              o
            </Balloon>
          )}
        </LetterO>
        n
      </LastName>
      <Confetti
        angle={90}
        colors={['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']}
        decay={0.9}
        drift={0}
        gravity={1}
        origin={{
          x,
          y,
        }}
        particleCount={500}
        resize
        scalar={1}
        shapes={['circle', 'square']}
        spread={360}
        startVelocity={20}
        ticks={180}
        useWorker
        zIndex={-1}
        fire={popped}
      />
      <Confetti
        angle={90}
        colors={['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']}
        decay={0.9}
        drift={0}
        gravity={1}
        origin={{
          x,
          y,
        }}
        particleCount={100}
        resize
        scalar={1}
        shapes={['circle', 'square']}
        spread={360}
        startVelocity={7}
        ticks={180}
        useWorker
        zIndex={-1}
        fire={popped}
      />
    </Title>
  )
}

const Title = styled.h1`
  font-family: 'Yeseva One';
  font-weight: normal;
  line-height: 0.75;
  width: min-content;
  max-width: 100%;

  font-size: clamp(56px, 10vw + 1rem, 156px);
`

const LastName = styled.span`
  white-space: nowrap;
`

const LetterO = styled.span`
  position: relative;
  color: white;
`

const Balloon = styled(animated.span)`
  color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
`

const Confetti = styled(ReactCanvasConfetti)`
  position: absolute;
  pointer-events: none;
  width: 100%;
  height: 200%;
  top: 0;
  left: 0;
  overflow: hidden;
`
