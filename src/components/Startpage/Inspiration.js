import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import useMeasure from 'react-use-measure'
import { ResizeObserver } from '@juggle/resize-observer'

export default function Inspiration() {
  const [open, setOpen] = useState(false)
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver })

  const [animation, set] = useSpring(() => ({
    transform: `translate(0px, 0px)`,
    width: `0px`,
    height: `0px`,
    borderRadius: '0%',
  }))

  useEffect(() => {
    set({
      transform: `translate(${bounds.left + 10}px, ${bounds.top + 10}px)`,
      width: `${bounds.width - 20}px`,
      height: `${bounds.height - 20}px`,
      borderRadius: randomRadius(),
      immediate: true,
    })
  }, [bounds, set])

  const handleClick = () => {
    if (open) {
      set({
        transform: `translate(${bounds.left + 10}px, ${bounds.top + 10}px)`,
        width: `${bounds.width - 20}px`,
        height: `${bounds.height - 20}px`,
        borderRadius: randomRadius(),
      })
    } else {
      set({
        transform: `translate(0px, 0px)`,
        width: `${window.innerWidth}px`,
        height: `${document.documentElement.scrollHeight}px`,
        borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%',
      })
    }

    setOpen(o => !o)
  }

  return (
    <InspirationWrapper ref={ref} onClick={handleClick}>
      <Content style={animation}></Content>
    </InspirationWrapper>
  )
}

const randomRadius = () => {
  const radiuses = [
    '71% 29% 64% 36% / 61% 35% 65% 39%',
    '38% 62% 42% 58% / 61% 49% 51% 39%',
    '57% 43% 23% 77% / 76% 35% 65% 24%',
    '57% 43% 72% 28% / 29% 77% 23% 71%',
    '64% 36% 14% 86% / 38% 87% 13% 62%',
  ]

  return radiuses[Math.floor(Math.random() * radiuses.length)]
}

const Content = styled(animated.div)`
  position: absolute;
  background: linear-gradient(#f0f696, #96f7d2);
  z-index: 2;
  border-radius: 38% 62% 42% 58% / 61% 49% 51% 39%;
  top: 0;
  left: 0;
  will-change: transform, width, height, border-radius;
`

const InspirationWrapper = styled.div`
  grid-column-start: 2 span;
  grid-row-start: 2 span;

  width: 100%;
  height: 100%;
  cursor: pointer;

  background: linear-gradient(#f3f8ff, #eeeeee);
`
