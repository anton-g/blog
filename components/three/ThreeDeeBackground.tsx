import { Suspense, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrthographicCamera, Stars } from '@react-three/drei'
import { Pigeon } from './Pigeon'
import { getUtils } from '../../utils/three'
import { Spin } from './Spin'
import { Boxy } from './Boxy'
import { Sphery } from './Sphery'
import { Torusy } from './Torusy'
import { TwistyBoxy } from './TwistyBoxy'
import { Coney } from './Coney'
import { YouMadeItText } from './YouMadeItText'
import styled from 'styled-components'
import { updateEggSeed } from '../../utils/eggs'

const ThreeDeeBackground = () => {
  const [clicks, setClicks] = useState(0)

  const handleClick = () => {
    const n = clicks + 1
    setClicks(n)

    updateEggSeed({
      b: n,
    })
  }

  return (
    <Wrapper>
      <Canvas onClick={handleClick}>
        <Suspense fallback={null}>
          <OrthographicCamera makeDefault zoom={120} position={[0, 0, 10]} />
          <ambientLight />
          <pointLight position={[1, 3, 3]} />
          <directionalLight color="white" position={[0, 3, 5]} />
          <directionalLight color="white" position={[-1, -2, -4]} />
          <Stars radius={1} depth={30} count={20000} factor={1} />
          <Objects />
        </Suspense>
        {/* <OrbitControls /> */}
      </Canvas>
    </Wrapper>
  )
}

const Objects = () => {
  const viewport = useThree((state) => state.viewport)

  const { getX, getY } = getUtils(viewport)

  return (
    <>
      <Sphery
        size={0.5}
        color={'#00A38D'}
        position={[getX(0.05), getY(0.83), 0]}
      />
      <Sphery
        size={1}
        color={'#c8ff00'}
        position={[getX(0.95), getY(0.9), 0]}
      />
      <Boxy
        size={0.5}
        position={[getX(0.15), getY(0.68), 0]}
        initialColor="#8f004c"
        activeColor="#aa9600"
      />
      <Torusy position={[getX(0.7), getY(0.15), 0]} color="#EB1E99" />
      <TwistyBoxy position={[getX(0.1), getY(0.42), 0]} size={1.5} />
      <Boxy
        size={0.5}
        position={[getX(0.37), getY(0.95), 0]}
        initialColor="#FF00FF"
        activeColor="#001ba0"
      />
      <Boxy
        size={0.5}
        position={[getX(0.1), getY(0.1), 0]}
        initialColor="#00b309"
        activeColor="#b50000"
      />
      <Coney size={1} position={[getX(0.95), getY(0.5), 0]} color="red" />
      <YouMadeItText position={[getX(0.45), getY(0.3), 0]} />
      <Suspense fallback={null}>
        <Spin position={[getX(0.45), getY(0.3), 0]}>
          <Pigeon scale={0.3} position={[2.3, 0, 0]} />
        </Spin>
      </Suspense>
    </>
  )
}

export default ThreeDeeBackground

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
`
