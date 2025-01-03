import { Suspense, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, OrthographicCamera, Stars } from '@react-three/drei'
import { get3DUtils } from '~/other/misc'
import { updateEggSeed } from '~/other/eggs'
import { Sphery } from './three/Sphery'
import { Boxy } from './three/Boxy'
import { Torusy } from './three/Torusy'
import { TwistyBoxy } from './three/TwistyBoxy'
import { Coney } from './three/Coney'
import { YouMadeItText } from './three/YouMadeItText'
import { Spin } from './three/Spin'
import { Pigeon } from './three/Pigeon'

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
    <div className="absolute top-0 left-0 bottom-0 right-0">
      <Canvas onClick={handleClick}>
        <Suspense fallback={null}>
          <OrthographicCamera makeDefault zoom={120} position={[0, 0, 10]} />
          <Environment preset="studio" />
          <ambientLight />
          <pointLight position={[1, 3, 3]} />
          <directionalLight color="white" position={[0, 3, 5]} />
          <directionalLight color="white" position={[-1, -2, -4]} />
          <Stars radius={1} depth={30} count={20000} factor={1} />
          <Objects />
        </Suspense>
      </Canvas>
    </div>
  )
}

const Objects = () => {
  const viewport = useThree((state) => state.viewport)

  const { getX, getY } = get3DUtils(viewport)

  return (
    <>
      <Sphery size={0.5} color={'#00A38D'} position={[getX(0.05), getY(0.83), 0]} />
      <Sphery size={1} color={'#c8ff00'} position={[getX(0.95), getY(0.9), 0]} />
      <Boxy size={0.5} position={[getX(0.15), getY(0.68), 0]} initialColor="#cd0000" activeColor="#ffe100" />
      <Torusy position={[getX(0.7), getY(0.15), 0]} color="#EB1E99" />
      <TwistyBoxy position={[getX(0.1), getY(0.42), 0]} size={1.5} />
      <Boxy size={0.5} position={[getX(0.37), getY(0.95), 0]} initialColor="#FF00FF" activeColor="#002aff" />
      <Boxy size={0.5} position={[getX(0.1), getY(0.1), 0]} initialColor="#00b309" activeColor="#b50000" />
      <Coney size={1} position={[getX(0.95), getY(0.5), 0]} color="red" />
      <YouMadeItText position={[getX(0.44), getY(0.32), 0]} />
      <Suspense fallback={null}>
        <Spin position={[getX(0.45), getY(0.3), 0]}>
          <Pigeon scale={0.3} position={[2.3, 0, 0]} />
        </Spin>
      </Suspense>
    </>
  )
}

export default ThreeDeeBackground
