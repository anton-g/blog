import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { animated, useSpring, useTransition, config } from 'react-spring'

const springConfig = {
  friction: 30,
  tension: 200,
  mass: 4,
}

const items = [
  {
    key: 1,
    text: 'Tre',
    padding: 78,
  },
  { key: 2, text: 'Fem', padding: 100 },
  { key: 3, text: 'Sju', padding: 75 },
  { key: 4, text: 'Tio', padding: 74 },
]

export default function Kampgeneratorn() {
  const [selectedCount, setSelectedCount] = useState(
    Math.floor(Math.random() * 4)
  )
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedCount(c => c + 1)
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const topAnimation = useSpring({
    from: { opacity: 0, transform: 'translate(-100%) rotate(8deg)' },
    to: { opacity: 1, transform: 'translate(0) rotate(-8deg)' },
    config: springConfig,
    delay: 500,
  })

  const bottomAnimation = useSpring({
    from: { opacity: 0, transform: 'translate(100%) rotate(8deg)' },
    to: { opacity: 1, transform: 'translate(0) rotate(-8deg)' },
    config: springConfig,
    delay: 500,
  })

  const item = items.find(i => i.key === (selectedCount % items.length) + 1)
  const transition = useTransition(item, {
    from: { position: 'absolute', opacity: 0, transform: 'translateY(-100%)' },
    enter: { opacity: 1, transform: 'translateY(0%)' },
    leave: { opacity: 0, transform: 'translateY(50%)' },
    config: config.stiff,
  })

  const paddingAnimation = useSpring({
    paddingLeft: `${item.padding}px`,
    config: config.wobbly,
  })

  return (
    <Wrapper href="https://kampgeneratorn.netlify.com">
      <StyledHeading>
        <StyledHeadingTop style={topAnimation}>
          {transition((props, item) => (
            <animated.span style={props}>{item.text}</animated.span>
          ))}
          <animated.span style={paddingAnimation}>kamps</animated.span>
        </StyledHeadingTop>
        <StyledHeadingBottom style={bottomAnimation}>
          Generatorn
        </StyledHeadingBottom>
      </StyledHeading>
    </Wrapper>
  )
}

const Wrapper = styled.a`
  width: 100%;
  height: 100%;
  grid-row-start: 2 span;
  grid-column-start: 4 span;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #142d4c;
  text-decoration: none;
  overflow: hidden;
`

const StyledHeading = styled.h1`
  margin-left: 25px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;

  font-family: 'Patua One';
  font-size: 52px;
  line-height: 0.8;
  color: white;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.2),
    0 10px 10px rgba(0, 0, 0, 0.15);
`

const StyledHeadingTop = styled(animated.span)`
  margin-left: -25px;
  transform: rotate(-8deg);
  will-change: opacity, transform;
`

const StyledHeadingBottom = styled(animated.span)`
  margin-left: 25px;
  transform: rotate(-8deg);
  will-change: opacity, transform;
`
