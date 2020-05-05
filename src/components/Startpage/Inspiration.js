import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated, useTransition, config } from 'react-spring'
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

  const subtitleAnim = useSpring({
    opacity: open ? 0.75 : 0,
    scale: open ? 1 : 0,
  })

  const transition = useTransition(open ? peopleData : [], {
    unique: true,
    trail: 400 / peopleData.length,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: (item, index) => ({
      opacity: 1,
      transform: 'scale(1)',
      delay: 50 * index,
    }),
    leave: { opacity: 0, transform: 'scale(0)' },
    config: config.wobbly,
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
        <Subtitle style={subtitleAnim}>
          a few people whose content I enjoy, and who deserve all the attention
          they get
        </Subtitle>
        <People>
          {transition((props, item) => (
            <PeopleLink style={{ ...props }} href={item.url}>
              {item.name}
            </PeopleLink>
          ))}
        </People>
        <CloseButton style={subtitleAnim}>Close</CloseButton>
      </Content>
    </InspirationWrapper>
  )
}

const Title = styled.h2`
  max-width: 200px;
`

const Subtitle = styled(animated.p)`
  margin: 0;
`

const Content = styled(animated.div)`
  position: absolute;
  background: linear-gradient(#f0f696, #96f7d2);
  z-index: 3;
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
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(auto-fit, 250px);
  grid-auto-rows: 100px;
  width: 100%;
  max-width: 1000px;
`

const CloseButton = styled(animated.button)`
  background: 0;
  border: 0;
  border-radius: 0;
  font-size: 2rem;
  margin-top: 1rem;
  font-weight: bold;
  cursor: pointer;
`

const PeopleLink = styled(animated.a)`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 250px;
  transition: filter 0.1s ease-in-out;
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  text-align: center;

  &:hover {
    background: linear-gradient(to right, #c02425, #f0cb35);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
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
    url: 'https://twitter.com/NikkitaFTW',
  },
  {
    name: 'Amelia Wattenberger',
    url: 'https://twitter.com/wattenberger',
  },
  {
    name: 'Paul Henschel',
    url: 'https://twitter.com/0xca0a',
  },
  {
    name: 'Josh Comeau',
    url: 'https://twitter.com/joshwcomeau',
  },
  {
    name: 'Emma Bostian',
    url: 'https://twitter.com/emmabostian',
  },
  {
    name: 'Dan Abramov',
    url: 'https://twitter.com/dan_abramov',
  },
  {
    name: 'Kitze',
    url: 'https://twitter.com/thekitze',
  },
  {
    name: 'Kent C. Dodds',
    url: 'https://twitter.com/kentcdodds',
  },
  {
    name: 'Veni Kunche',
    url: 'https://twitter.com/venikunche',
  },
  {
    name: 'Cassidy Williams',
    url: 'https://twitter.com/cassidoo',
  },
  {
    name: 'Brené Brown',
    url: 'https://twitter.com/brenebrown',
  },
  {
    name: 'Sara Soueidan',
    url: 'https://twitter.com/sarasoueidan',
  },
  {
    name: 'Kurt Kemple',
    url: 'https://twitter.com/kurtkemple',
  },
  {
    name: 'Maggie Appleton',
    url: 'https://twitter.com/Mappletons',
  },
  {
    name: 'Max Stoiber',
    url: 'https://twitter.com/mxstbr',
  },
]
