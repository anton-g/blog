import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useState } from 'react'
import useDimensions from '../hooks/useDimensions'
import { Spacer } from '../components/Spacer'
import { Nav } from '../components/Nav'
import { MainHeading } from '../components/MainHeading'
import { FeaturedPosts } from '../components/FeaturedPosts'
import { Projects } from '../components/Projects'
import { Appearances } from '../components/Appearances'
import { CircleTextButton } from '../components/CircleTextButton'
import { Newsletter } from '../components/Newsletter'
import { BottomDrawer } from '../components/BottomDrawer'
// import dynamic from 'next/dynamic'
// const ThreeDeeBackground = dynamic(
//   () => import('../components/ThreeDeeBackground')
// )

const Home: NextPage = () => {
  const [zoomOutActive, setZoomOutActive] = useState(false)
  const [ref, dimensions] = useDimensions({ liveMeasure: false })

  return (
    <OuterWrapper
      style={{
        height: dimensions?.height || '100%',
      }}
    >
      {/* {konamiActive && <ThreeDeeBackground />} */}
      <Wrapper
        animate={zoomOutActive ? 'open' : 'closed'}
        initial={false}
        variants={zoomVariants}
        ref={ref}
      >
        <Head>
          <title>anton gunnarsson</title>
          <meta name="description" content="anton gunnarsson" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav hideLogo />
        <MainHeading />
        <Spacer size={48} />
        <FeaturedPosts />
        <Spacer size={128} />
        <Projects />
        <Spacer size={128} />
        <Appearances />
        <Spacer size={128} />
        <CircleTextButton onSuccess={() => setZoomOutActive(true)} />
        <Spacer size={128} />
        <Newsletter />
        <BottomDrawer liveMeasureDisabled={zoomOutActive} />
      </Wrapper>
    </OuterWrapper>
  )
}

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: black;
  perspective: 1200px;
  color: palevioletred;
  position: relative;
  height: 100%;
`

const Wrapper = styled(motion.div)`
  top: 0;
  width: 100%;
  max-width: 100%;
  color: var(--color-gray12);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  position: absolute;
  background-color: var(--color-gray1);
  transform-origin: 50% 30%;
`

export default Home

const zoomVariants = {
  open: {
    scale: [1, 0.99, 1.02, 0.98, 1.03, 0.97, 1.04, 0.85, 0.7],
    rotateX: [
      '0deg',
      '0deg',
      '0deg',
      '0deg',
      '0deg',
      '0deg',
      '0deg',
      '6deg',
      '0deg',
    ],
    transition: {
      ease: 'easeInOut',
      duration: 2.5,
      times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1],
      delay: 0.2,
    },
  },
  closed: {
    scale: [0.7, 1],
    rotateX: ['0deg', '6deg', '0deg'],
    transition: {
      ease: 'easeInOut',
      duration: 1,
      times: [0, 0.6, 1],
    },
  },
}
