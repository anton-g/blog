import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated, useTransition } from 'react-spring'
import useMeasure from 'react-use-measure'
import { ResizeObserver } from '@juggle/resize-observer'
import useScrollLock from '../useScrollLock'

export default function Inspiration() {
  const [open, setOpen] = useState(false)
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver })
  useScrollLock(open)

  const [animation, set] = useSpring(() => ({
    transform: `translate(0px, 0px)`,
    width: `0px`,
    height: `0px`,
    borderRadius: '0%',
  }))

  const transition = useTransition(open ? peopleData : [], {
    unique: true,
    trail: 400 / peopleData.length,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)', delay: 250 },
    leave: { opacity: 0, transform: 'scale(0)' },
  })

  useEffect(() => {
    set({
      transform: `translate(${bounds.left + 10}px, ${bounds.top +
        10 +
        window.scrollY}px)`,
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
        delay: 400,
      })
    } else {
      set({
        transform: `translate(0px, ${window.scrollY}px)`,
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`,
        borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%',
      })
    }

    setOpen(o => !o)
  }

  return (
    <InspirationWrapper ref={ref} onClick={handleClick}>
      <Content style={animation} open={open}>
        <Title>inspirational people</Title>
        <People>
          {transition((props, item) => (
            <PeopleLink style={{ ...props }}>{item.name}</PeopleLink>
          ))}
        </People>
      </Content>
    </InspirationWrapper>
  )
}

const Title = styled.h2`
  max-width: 200px;
`

const Content = styled(animated.div)`
  position: absolute;
  background: linear-gradient(#f0f696, #96f7d2);
  z-index: 2;
  border-radius: 38% 62% 42% 58% / 61% 49% 51% 39%;
  top: 0;
  left: 0;
  will-change: transform, width, height, border-radius;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  overflow-y: ${p => (p.open ? 'scroll' : null)};
`

const People = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-auto-rows: 100px;
  width: 100%;
  max-width: 800px;
`

const PeopleLink = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
`

const InspirationWrapper = styled.div`
  grid-column-start: 2 span;
  grid-row-start: 2 span;

  width: 100%;
  height: 100%;
  cursor: pointer;

  background: linear-gradient(#f3f8ff, #eeeeee);
`

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

const peopleData = [
  {
    name: 'Sara Viera',
  },
  {
    name: 'Max Stoiber',
  },
  {
    name: 'Amelia Wattenberger',
  },
  {
    name: 'Paul Henschel',
  },
  {
    name: 'Josh Comeau',
  },
  {
    name: 'Emma Bostian',
  },
  {
    name: 'Dan Abramov',
  },
  {
    name: 'Steve Schoger',
  },
  {
    name: 'Kent C. Dodds',
  },
  {
    name: 'Veni Kunche',
  },

  {
    name: 'Cassidy Williams',
  },
  {
    name: 'Brené Brown',
  },
  {
    name: 'Sara Soueidan',
  },
]
