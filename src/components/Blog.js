import React, { useState } from 'react'
import styled from 'styled-components'
import { useHover } from 'react-use-gesture'
import { animated, useTransition } from 'react-spring'

export default function Blog() {
  const [key, setKey] = useState(0)

  const transition = useTransition(key, {
    from: { left: '458px' },
    enter: { left: '0px' },
    leave: { left: '-458px' },
    config: { duration: 4000 },
    onRest: () => setKey(k => k + 1),
  })

  return (
    <Wrapper>
      {transition((props, item) => (
        <Text style={props}>blog blog blog </Text>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  grid-column-start: span 4;
  grid-row-start: span 1;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
`

const Text = styled(animated.h2)`
  position: absolute;
  top: 0;
  font-family: 'Inter';
  font-size: 4rem;
  margin: 0;
  white-space: pre;
  will-change: left;
`
