import { useAnimation, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import useDimensions from '../hooks/useDimensions'
import { BlogRoll } from './BlogRoll'
import { ControlPanel } from './ControlPanel'
import { Spacer } from './Spacer'

export const BottomDrawer = ({
  liveMeasureDisabled,
}: {
  liveMeasureDisabled: boolean
}) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const controls = useAnimation()
  const [ref, dimensions] = useDimensions({ liveMeasure: !liveMeasureDisabled })

  const height = dimensions?.height || 0

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
    <Wrapper>
      <Draggable
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
        <Spacer size={32} />
        <BlogRoll />
        <Content ref={ref}>
          <ControlPanel></ControlPanel>
        </Content>
      </Draggable>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow-y: hidden;
`

const Content = styled.div`
  padding: 24px 36px;

  background-image: linear-gradient(
    50deg,
    hsl(71deg 100% 70%) 0%,
    hsl(53deg 100% 66%) 11%,
    hsl(47deg 100% 65%) 22%,
    hsl(38deg 100% 67%) 33%,
    hsl(25deg 100% 71%) 44%,
    hsl(6deg 100% 76%) 56%,
    hsl(343deg 100% 75%) 67%,
    hsl(326deg 100% 73%) 78%,
    hsl(312deg 100% 73%) 89%,
    hsl(298deg 100% 74%) 100%
  );
`

const Draggable = styled(motion.div)`
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`
