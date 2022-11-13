import { OrthographicCamera, RoundedBox } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMutation } from '@tanstack/react-query'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Suspense, useRef } from 'react'
import styled from 'styled-components'
import { Mesh } from 'three'

const Secret: NextPage = () => {
  const pinkInput = useRef<HTMLInputElement>(null!)
  const redInput = useRef<HTMLInputElement>(null!)
  const greenInput = useRef<HTMLInputElement>(null!)

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    async ({
      pink,
      green,
      red,
    }: {
      pink: string
      green: string
      red: string
    }) => {
      const response = await fetch('/api/secret', {
        method: 'POST',
        body: JSON.stringify({
          pink,
          green,
          red,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error()
      else {
        return response.json()
      }
    },
    {
      onSuccess: () => {
        console.log('woop woop')
      },
    }
  )

  const handleClick = () => {
    const pink = pinkInput.current.value
    const red = redInput.current.value
    const green = greenInput.current.value

    mutate({
      green,
      pink,
      red,
    })
  }

  return (
    <Wrapper>
      <Head>
        <title>🤫</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Content>
        <span style={{ fontSize: 36 }}>👀</span>
        <Grid>
          <Clue color={'#FF00FF'} offset={-0.0005} />
          <Arrow />
          <Input type="text" ref={pinkInput} />
          <Clue color={'#00b309'} offset={0.0005} />
          <Arrow />
          <Input type="text" ref={greenInput} />
          <Clue color={'#8f004c'} offset={0} />
          <Arrow />
          <Input type="text" ref={redInput} />
        </Grid>
        <Button onClick={handleClick} disabled={isLoading}>
          Continue
        </Button>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-bottom: 36px;
  color: var(--color-gray1);
  background-color: var(--color-gray12);
  min-height: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Grid = styled.div`
  padding: 0 16px;
  text-align: center;
  display: grid;
  grid-template-columns: 120px 40px 1fr;
  gap: 0 16px;
  align-items: center;
  width: 100%;

  > * {
    justify-self: center;
  }
`

const Clue = ({ color, offset }: { color: string; offset: number }) => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <OrthographicCamera makeDefault zoom={120} position={[0, 0, 10]} />
        <ambientLight />
        <pointLight position={[1, 3, 3]} />
        <directionalLight color="white" position={[0, 3, 5]} />
        <directionalLight color="white" position={[-1, -2, -4]} />
      </Suspense>
      {/* <OrbitControls /> */}
      <Box color={color} offset={offset} />
    </Canvas>
  )
}

const Box = ({ color, offset }: { color: string; offset: number }) => {
  const mesh = useRef<Mesh>(null!)
  useFrame(() => {
    if (!mesh.current) return

    mesh.current.rotation.x =
      mesh.current.rotation.y =
      mesh.current.rotation.z +=
        0.002 + offset
  })

  return (
    <RoundedBox position={[0, 0, 0]} args={[0.5, 0.5, 0.5]} ref={mesh}>
      <meshLambertMaterial color={color} />
    </RoundedBox>
  )
}

const Arrow = () => {
  return (
    <svg
      style={{ width: '32px', height: '32px' }}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
    </svg>
  )
}

const Input = styled.input`
  font-size: 24px;
  width: 100%;
`

const Button = styled.button`
  margin-top: 36px;
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
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  flex-shrink: 0;
  font-family: 'Inter UI', 'SF Pro Display', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 18px;
  font-weight: 500;
  height: 4rem;
  padding: 0 36px;
  text-align: center;
  text-shadow: rgba(0, 0, 0, 0.5) 0 3px 8px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  transition: transform 200ms ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`

export default Secret
