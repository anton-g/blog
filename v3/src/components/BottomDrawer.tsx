import { useAnimation, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import useDimensions from '../hooks/useDimensions'
import { BlogRoll } from './BlogRoll'
import { Spacer } from './Spacer'

export const BottomDrawer = () => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const controls = useAnimation()
  const [ref, dimensions] = useDimensions()

  const height = dimensions?.height || 0

  useEffect(() => {
    controls.start(isActive ? 'active' : 'inactive')
  }, [isActive, controls])

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
        dragElastic={0.1}
        variants={variants}
        transition={{ type: 'spring', damping: 20, stiffness: 280 }}
        onDragEnd={(_event, info) => {
          const isDraggingUp = info.velocity.y < 0
          const multiplier = isDraggingUp ? 2 / 3 : 1 / 4
          const threshold = height * multiplier

          const overThreshold = Math.abs(info.offset.y) > threshold

          if (overThreshold && isActive) {
            setIsActive(false)
          } else if (overThreshold && !isActive) {
            setIsActive(true)
          } else {
            controls.start(isActive ? 'active' : 'inactive')
          }
        }}
      >
        <Spacer size={32} />
        <BlogRoll />
        <Content ref={ref}>
          <p>foo</p>
          <p>bar</p>
          <p>baz</p>
          <p>fab</p>
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

const Content = styled.div``

const Draggable = styled(motion.div)`
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`
