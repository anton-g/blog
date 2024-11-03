import { useAnimation, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import useDimensions from '~/hooks/useDimensions'
import { BlogRoll } from './BlogRoll'
import { ControlPanel } from './ControlPanel'

export const BottomDrawer = ({ liveMeasureDisabled }: { liveMeasureDisabled: boolean }) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const controls = useAnimation()
  const [ref, dimensions] = useDimensions({ liveMeasure: !liveMeasureDisabled })

  const height = (dimensions?.height || 0) - 5

  useEffect(() => {
    controls.start(isActive ? 'active' : 'inactive')
  }, [isActive, controls, height])

  const variants = {
    active: {
      y: 0,
    },
    inactive: {
      y: height,
    },
  }

  return (
    <div className="relative w-full overflow-y-hidden">
      <motion.div
        className="sticky bottom-0 flex flex-col w-full"
        drag="y"
        dragConstraints={{
          top: 0,
          bottom: height,
        }}
        animate={controls}
        dragElastic={0.05}
        variants={variants}
        transition={{ type: 'spring', damping: 20, stiffness: 280 }}
        onDragEnd={(_event, info) => {
          const isDraggingUp = info.velocity.y <= 0
          const multiplier = isDraggingUp ? 2 / 3 : 1 / 4
          const threshold = height * multiplier

          const overThreshold = Math.abs(info.offset.y) > threshold

          if (!isDraggingUp && overThreshold && isActive) {
            setIsActive(false)
          } else if (isDraggingUp && overThreshold && !isActive) {
            setIsActive(true)
          } else {
            controls.start(isActive ? 'active' : 'inactive')
          }
        }}
      >
        {/* <Spacer size={32} /> */}
        <BlogRoll />
        <div
          className="py-6 px-14"
          style={{
            backgroundImage:
              'linear-gradient(50deg, hsl(71deg 100% 70%) 0%, hsl(53deg 100% 66%) 11%, hsl(47deg 100% 65%) 22%, hsl(38deg 100% 67%) 33%, hsl(25deg 100% 71%) 44%, hsl(6deg 100% 76%) 56%, hsl(343deg 100% 75%) 67%, hsl(326deg 100% 73%) 78%, hsl(312deg 100% 73%) 89%, hsl(298deg 100% 74%) 100%)',
          }}
          ref={ref}
        >
          <ControlPanel />
        </div>
      </motion.div>
    </div>
  )
}

// const Content = styled.div`
//   padding: 24px 36px;

//   background-image: linear-gradient(50deg, hsl(71deg 100% 70%) 0%, hsl(53deg 100% 66%) 11%, hsl(47deg 100% 65%) 22%, hsl(38deg 100% 67%) 33%, hsl(25deg 100% 71%) 44%, hsl(6deg 100% 76%) 56%, hsl(343deg 100% 75%) 67%, hsl(326deg 100% 73%) 78%, hsl(312deg 100% 73%) 89%, hsl(298deg 100% 74%) 100%);
// `
