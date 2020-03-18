import React, { useLayoutEffect } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import BlockWrapper from './BlockWrapper'

export default function ColorTweaker() {
  const [rotation, setRotation] = useState(0)

  useLayoutEffect(() => {
    document.body.style.filter = `hue-rotate(${rotation}deg)`
  }, [rotation])

  return (
    <Wrapper width="2" height="1">
      <Text>
        TWEAK IT TWEAK IT TWEAK IT TWEAK IT TWEAK IT TWEAK IT TWEAK IT TWEAK IT
        TWEAK IT TWEAK IT TWEAK IT
      </Text>
      <Input
        type="range"
        min="0"
        max="360"
        value={rotation}
        onChange={e => setRotation(e.target.value)}
      />
    </Wrapper>
  )
}

const Wrapper = styled(BlockWrapper)`
  grid-column-start: 2 span;
  grid-row-start: 1 span;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  overflow: hidden;
  background-color: #e2c275;
`

const Input = styled.input`
  width: 90%;
  z-index: 2;
`

const Text = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 20px;
  letter-spacing: -1px;
  text-align: center;
  color: #edd9ab;
  user-select: none;
`
