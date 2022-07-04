import type { NextPage } from 'next'
import styled from 'styled-components'
import { Nav } from '../components/Nav'
import { Spacer } from '../components/Spacer'
import { Canvas } from '@react-three/fiber'
import { Box, Html, OrbitControls } from '@react-three/drei'
import { useMutation } from 'react-query'

const Puzzle: NextPage = () => {
  const { mutate, data } = useMutation<{ success: true }, unknown, { code: number }>(({ code }) => {
    return fetch('/api/puzzle', {
      method: 'POST',
      body: JSON.stringify({
        code,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) throw new Error()
      else {
        // soundMode && playFanfare()
        return response.json()
      }
    })
  })

  return (
    <Wrapper>
      <Nav />
      <Content>
        <Canvas>
          <OrbitControls
            enableRotate={false}
            autoRotate={data?.success}
            autoRotateSpeed={3}
            enableZoom={false}
            enablePan={false}
          ></OrbitControls>
          <ambientLight />
          <pointLight position={[1, 3, 3]} />
          <directionalLight color="white" position={[0, 3, 5]} />
          <directionalLight color="white" position={[-1, -2, -4]} />
          <Box args={[2, 1, 2]} removeFromParent={undefined}>
            <meshLambertMaterial color="gray" />
            <Html position={[0, 0, 1.01]} transform occlude scale={0.5}>
              <input type="text" />
              <Spacer size={8} />
              <Button type="submit" onClick={() => mutate({ code: 688 })}>
                Submit
              </Button>
            </Html>
          </Box>
        </Canvas>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.gray12};
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const Button = styled.button`
  width: 100%;
`

export default Puzzle
