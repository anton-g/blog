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
        <People>
          {transition((props, item) => (
            <PeopleLink
              style={{ ...props }}
              image={item.image}
              href={item.url}
            ></PeopleLink>
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
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(auto-fit, 150px);
  grid-auto-rows: 150px;
  width: 100%;
  max-width: 800px;
`

const PeopleLink = styled(animated.a)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${p => p.image});
  background-size: cover;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: filter 0.1s ease-in-out;
  filter: grayscale(50%);

  &:hover {
    filter: grayscale(0%);
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
    image:
      'https://pbs.twimg.com/profile_images/1229167683633131521/BAEBTa8v_400x400.jpg',
    url: 'https://twitter.com/NikkitaFTW',
  },
  {
    name: 'Amelia Wattenberger',
    url: 'https://twitter.com/wattenberger',
    image:
      'https://pbs.twimg.com/profile_images/1221632617767997440/1TEt3jfj_400x400.png',
  },
  {
    name: 'Paul Henschel',
    url: 'https://twitter.com/0xca0a',
    image:
      'https://pbs.twimg.com/profile_images/1051050638195482624/Q3dOn3o9_400x400.jpg',
  },
  {
    name: 'Josh Comeau',
    url: 'https://twitter.com/joshwcomeau',
    image:
      'https://pbs.twimg.com/profile_images/461190672117035010/0kJ4pynr_400x400.jpeg',
  },
  {
    name: 'Emma Bostian',
    url: 'https://twitter.com/emmabostian',
    image:
      'https://pbs.twimg.com/profile_images/1228620966693154816/AuiCdXC5_400x400.jpg',
  },
  {
    name: 'Dan Abramov',
    url: 'https://twitter.com/dan_abramov',
    image:
      'https://pbs.twimg.com/profile_images/1166344766210150401/amRnWzl-_400x400.jpg',
  },
  {
    name: 'Kent C. Dodds',
    url: 'https://twitter.com/kentcdodds',
    image:
      'https://pbs.twimg.com/profile_images/759557613445001216/6M2E1l4q_400x400.jpg',
  },
  {
    name: 'Veni Kunche',
    url: 'https://twitter.com/venikunche',
    image:
      'https://pbs.twimg.com/profile_images/1192278417934303232/WH8LwUm3_400x400.jpg',
  },
  {
    name: 'Cassidy Williams',
    url: 'https://twitter.com/cassidoo',
    image:
      'https://pbs.twimg.com/profile_images/718548236580098048/OgV0pPQY_400x400.jpg',
  },
  {
    name: 'Brené Brown',
    url: 'https://twitter.com/brenebrown',
    image:
      'https://pbs.twimg.com/profile_images/1212148385978953729/4rIadTSL_400x400.jpg',
  },
  {
    name: 'Sara Soueidan',
    url: 'https://twitter.com/sarasoueidan',
    image:
      'https://pbs.twimg.com/profile_images/1010126354078208001/MpkO7-qK_400x400.jpg',
  },
]
