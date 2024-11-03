import type { MetaFunction } from '@remix-run/node'
import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
// import useDimensions from '../hooks/useDimensions'
// import { Spacer } from '../components/Spacer'
// import { Nav } from '../components/Nav'
// import { MainHeading } from '../components/MainHeading'
// import { FeaturedPosts } from '../components/FeaturedPosts'
// import { Projects } from '../components/Projects'
// import { Appearances } from '../components/Appearances'
// import { CircleTextButton } from '../components/CircleTextButton'
// import { Newsletter } from '../components/Newsletter'
// import { BottomDrawer } from '../components/BottomDrawer'
// import dynamic from 'next/dynamic'
import { trackGoal } from 'fathom-client'
import useDimensions from '~/hooks/useDimensions'
import { cn } from '~/other/misc'
import { Nav } from '~/components/Nav'
import { MainHeading } from '~/components/MainHeading'
import { FeaturedPosts } from '~/components/FeaturedPosts'
import { Projects } from '~/components/Projects'
import { Appearances } from '~/components/Appearances'
// import { updateAchievements } from '../utils/eggs'
// const ThreeDeeBackground = dynamic(() => import('../components/three/ThreeDeeBackground'))

export const meta: MetaFunction = () => {
  return [
    { title: 'anton gunnarsson' },
    { name: 'description', content: 'antons home on the world wide web' },
  ]
}

export default function Index() {
  const [barrelRoll, setBarrelRoll] = useState(false)
  const [load3D, setLoad3D] = useState(false)
  const [zoomOutActive, setZoomOutActive] = useState(false)
  const [ref, dimensions] = useDimensions({ liveMeasure: false })
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className="flex flex-col items-center justify-center bg-black"
      style={{
        height: dimensions?.height || '100%',
      }}
    >
      {/* {load3D && <ThreeDeeBackground />} */}
      <motion.div
        animate={zoomOutActive ? 'open' : 'closed'}
        initial={false}
        variants={zoomVariants(prefersReducedMotion ?? false)}
        ref={ref}
        className={cn(
          'duration-[3s] ease-in-out top-0 w-full max-w-full text-gray-12 bg-gray-100 flex flex-col items-center overflow-x-hidden absolute',
          'min-h-screen', // TODO remove me
          { 'animate-spin': barrelRoll }
        )}
        style={{
          transformOrigin: barrelRoll ? '50% 50%' : '50% 30%',
        }}
        onAnimationEnd={() => setBarrelRoll(false)}
      >
        <Nav />
        <MainHeading />
        {/* <Spacer size={48} /> */}
        <FeaturedPosts />
        {/* <Spacer size={128} /> */}
        <Projects />
        {/* <Spacer size={128} /> */}
        <Appearances />
        {/* 
        <Spacer size={128} />
        <CircleTextButton
          onClick={() => {
            if (zoomOutActive) {
              setZoomOutActive(false)
              // for some reason, unloading r3f breaks react-spring
              // setLoad3D(false)
            }
          }}
          onSuccess={() => {
            setLoad3D(true)
            setTimeout(() => {
              setZoomOutActive(true)
              updateAchievements({
                m: true,
              })
            }, 1000)
          }}
        />
        <Spacer size={128} />
        <Newsletter
          onEasterEgg={() => {
            setBarrelRoll(true)
            trackGoal('YOFKF63X', 0)
            updateAchievements({
              r: true,
            })
          }}
        />
        <BottomDrawer liveMeasureDisabled={zoomOutActive} /> */}
      </motion.div>
    </div>
  )
}

const zoomVariants = (prefersReducedMotion: boolean) => ({
  open: {
    scale: [1, 0.99, 1.02, 0.98, 1.03, 0.97, 1.04, 0.85, 0.4],
    rotateX: ['0deg', '0deg', '0deg', '0deg', '0deg', '0deg', '0deg', '6deg', '0deg'],
    transition: {
      ease: 'easeInOut',
      duration: prefersReducedMotion ? 0.01 : 2.5,
      times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1],
      delay: 0.2,
    },
  },
  closed: {
    scale: [0.4, 1],
    rotateX: ['0deg', '6deg', '0deg'],
    transition: {
      ease: 'easeInOut',
      duration: prefersReducedMotion ? 0.01 : 1,
      times: [0, 0.6, 1],
    },
  },
})

// const barrel = keyframes`
//   0% {
//     transform: rotateZ(0deg);
//   }
//   100% {
//     transform: rotateZ(360deg);
//   }
// `

/*


const Wrapper = styled(motion.div)<{ $roll: boolean }>`
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

  ${({ $roll }) =>
    $roll &&
    css`
      animation: ${barrel} 3s ease-in-out;
      transform-origin: 50% 50%;
    `}
`
*/
