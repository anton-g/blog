/* eslint-disable react/no-unescaped-entities */
import React, { ReactNode, useState } from 'react'
import { styled } from '@stitches/react'

export default function RenderPropsCounter({ renderCount }: { renderCount: (count: number) => ReactNode }) {
  const [count, setCount] = useState(0)

  return (
    <Wrapper>
      <h1>Click it, I'm interactive!</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase count</button>
      <p>{renderCount(count)}</p>
    </Wrapper>
  )
}

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '3px solid var(--color-quote)',
  borderRadius: '8px',
  h1: { fontSize: '24px', marginBottom: '1rem' },
})
