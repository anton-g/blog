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
        dragElastic={0.1}
        variants={variants}
        transition={{ type: 'spring', damping: 20, stiffness: 280 }}
        onDragEnd={(_event, info) => {
          const isDraggingUp = info.velocity.y < 0
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

const Content = styled.div``

const Draggable = styled(motion.div)`
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ControlPanel = () => {
  return (
    <Panel>
      <PanelInside>
        <TopLeftScrew />
        <TopRightScrew />
        <input type="color" />
        <BottomLeftScrew />
        <BottomRightScrew />
      </PanelInside>
    </Panel>
  )
}

const Panel = styled.div`
  background-color: ${({ theme }) => theme.colors.gray11};
  padding: 6px;
`

const PanelInside = styled.div`
  background-color: ${({ theme }) => theme.colors.gray3};
  border: 1px solid ${({ theme }) => theme.colors.gray7};
  position: relative;
  padding: 8px 16px;
`

const Screw = ({ className }: { className?: string }) => {
  return (
    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" className={className}>
      <circle cx="3.5" cy="3.5" r="3.5" fill="url(#screw-gradient)"></circle>
      <line x1="4.20708" y1="4.20709" x2="2.79286" y2="2.79288" stroke="#9D9D9D" strokeLinecap="round"></line>
      <line x1="2.79291" y1="4.20708" x2="4.20712" y2="2.79286" stroke="#9D9D9D" strokeLinecap="round"></line>
      <defs>
        <radialGradient
          id="screw-gradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(3.5 3.5) rotate(90) scale(3.5)"
        >
          <stop stopColor="#EAEAEA"></stop>
          <stop offset="1" stopColor="#DFDFDF"></stop>
        </radialGradient>
      </defs>
    </svg>
  )
}

const TopLeftScrew = styled(Screw)`
  position: absolute;
  top: 4px;
  left: 4px;
`

const TopRightScrew = styled(Screw)`
  position: absolute;
  top: 4px;
  right: 4px;
`

const BottomLeftScrew = styled(Screw)`
  position: absolute;
  bottom: 4px;
  left: 4px;
`

const BottomRightScrew = styled(Screw)`
  position: absolute;
  bottom: 4px;
  right: 4px;
`
