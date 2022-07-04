import { useRef } from 'react'
import { Canvas, Size, useFrame, useThree, Vector3 } from '@react-three/fiber'
import {
  Cone,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrthographicCamera,
  RoundedBox,
  Sphere,
  Stars,
  Torus,
} from '@react-three/drei'

const ThreeDeeBackground = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
      }}
    >
      <Canvas>
        {/* <OrbitControls /> */}
        <OrthographicCamera makeDefault zoom={120} position={[0, 0, 10]} />
        <ambientLight />
        <pointLight position={[1, 3, 3]} />
        <directionalLight color="white" position={[0, 3, 5]} />
        <directionalLight color="white" position={[-1, -2, -4]} />
        <Stars radius={1} depth={30} count={20000} factor={1} />
        <Objects />
      </Canvas>
    </div>
  )
}
const Objects = () => {
  const { viewport } = useThree()

  const { getX, getY } = getUtils(viewport)

  return (
    <>
      <Sphery size={0.5} color={'#00A38D'} position={[getX(0.05), getY(0.83), 0]} />
      <Sphery size={1} color={'#c8ff00'} position={[getX(0.95), getY(0.9), 0]} />
      <Boxy size={0.5} position={[getX(0.15), getY(0.68), 0]} />
      <Torusy position={[getX(0.7), getY(0.15), 0]} color="#EB1E99" />
      <TwistyBoxy position={[getX(0.1), getY(0.42), 0]} size={1.5} color="#c8ff00" />
      <Boxy size={0.5} position={[getX(0.37), getY(0.95), 0]} />
      <Boxy size={0.5} position={[getX(0.1), getY(0.1), 0]} />
      <Coney size={1} position={[getX(0.95), getY(0.5), 0]} color="red" />
    </>
  )
}
const getUtils = (size: Size) => {
  const top = size.height / 2
  const right = size.width / 2
  const left = -right
  const bottom = -top

  const getX = (factor: number) => {
    return size.width * factor - size.width / 2
  }
  const getY = (factor: number) => {
    return size.height * factor - size.height / 2
  }

  return { getX, getY }
}
const Boxy = ({ position, size }: { size: number; position: Vector3 }) => {
  const mesh = useRef<any>()
  useFrame(() => {
    if (!mesh.current) return

    mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += 0.002
  })

  return (
    <RoundedBox ref={mesh} args={[size, size, size]} position={position} radius={0.1} smoothness={4}>
      <meshLambertMaterial color="palevioletred" />
    </RoundedBox>
  )
}
const Sphery = ({ position, size, color }: { size: number; position: Vector3; color: string }) => {
  return (
    <Sphere visible position={position} args={[size, 16, 200]}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.5} // Strength, 0 disables the effect (default=1)
        speed={2} // Speed (default=1)
        roughness={0}
      />
    </Sphere>
  )
}
const Torusy = ({ position, color }: { position: Vector3; color: string }) => {
  const mesh = useRef<any>()
  useFrame(() => {
    if (!mesh.current) return

    mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += 0.002
  })

  return (
    <Torus ref={mesh} args={[1.5, 0.5, 32, 156]} position={position}>
      <MeshWobbleMaterial
        attach="material"
        color={color}
        factor={3} // Strength, 0 disables the effect (default=1)
        speed={0.5} // Speed (default=1)
        roughness={0}
      />
    </Torus>
  )
}
const TwistyBoxy = ({ position, size, color }: { size: number; position: Vector3; color: string }) => {
  const mesh = useRef<any>()
  useFrame(() => {
    if (!mesh.current) return

    mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += 0.002
  })

  return (
    <RoundedBox ref={mesh} args={[size, size, size]} radius={0.1} smoothness={4} position={position}>
      <MeshWobbleMaterial
        attach="material"
        color={color}
        factor={2} // Strength, 0 disables the effect (default=1)
        speed={1.5} // Speed (default=1)
        roughness={0}
      />
    </RoundedBox>
  )
}
const Coney = ({ position, size, color }: { size: number; position: Vector3; color: string }) => {
  const mesh = useRef<any>()
  useFrame(() => {
    if (!mesh.current) return

    mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += 0.002
  })

  return (
    <Cone ref={mesh} args={[size, size * 3, 32]} position={position}>
      <MeshWobbleMaterial
        attach="material"
        color={color}
        factor={2} // Strength, 0 disables the effect (default=1)
        speed={1.5} // Speed (default=1)
        roughness={0}
      />
    </Cone>
  )
}

export default ThreeDeeBackground
