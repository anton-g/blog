import type { MetaFunction } from '@remix-run/node'
import { motion, useReducedMotion } from 'framer-motion'
import { lazy, startTransition, Suspense, useState } from 'react'
import { trackGoal } from 'fathom-client'
import useDimensions from '~/hooks/useDimensions'
import { cn } from '~/other/misc'
import { Nav } from '~/components/Nav'
import { MainHeading } from '~/components/MainHeading'
import { FeaturedPosts } from '~/components/FeaturedPosts'
import { Projects } from '~/components/Projects'
import { Appearances } from '~/components/Appearances'
import { BottomDrawer } from '~/components/BottomDrawer'
import { CircleTextButton } from '~/components/CircleTextButton'
const ThreeDeeBackground = lazy(() => import('~/components/ThreeDeeBackground'))
// import ThreeDeeBackground from '~/components/ThreeDeeBackground'
import { updateAchievements } from '~/other/eggs'

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
      className="flex h-full justify-center bg-black relative"
      style={{
        perspective: '1200px',
        height: dimensions?.height || '100%',
      }}
    >
      {load3D && <ThreeDeeBackground />}
      <motion.div
        animate={zoomOutActive ? 'open' : 'closed'}
        initial={false}
        variants={zoomVariants(prefersReducedMotion ?? false)}
        ref={ref}
        className={cn(
          'top-0 w-full max-w-full text-gray-950 bg-gray-100 flex flex-col items-center overflow-x-hidden absolute',
          { 'animate-spin': barrelRoll }
        )}
        style={{
          transformOrigin: barrelRoll ? '50% 50%' : '50% 30%',
        }}
        onAnimationEnd={() => setBarrelRoll(false)}
      >
        <Nav />
        <MainHeading className="mb-12" />
        <FeaturedPosts className="mb-32" />
        <Projects className="mb-32" />
        <Appearances className="mb-32" />
        <CircleTextButton
          className="mb-32"
          onClick={() => {
            if (zoomOutActive) {
              setZoomOutActive(false)
              // for some reason, unloading r3f breaks react-spring
              // setLoad3D(false)
            }
          }}
          onSuccess={() => {
            startTransition(() => {
              setLoad3D(true)
            })
            setTimeout(() => {
              setZoomOutActive(true)
              updateAchievements({
                m: true,
              })
            }, 1000)
          }}
        />
        {/*
        <Newsletter
          onEasterEgg={() => {
            setBarrelRoll(true)
            trackGoal('YOFKF63X', 0)
            updateAchievements({
              r: true,
            })
          }}
        />*/}
        <BottomDrawer liveMeasureDisabled={zoomOutActive} />
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
