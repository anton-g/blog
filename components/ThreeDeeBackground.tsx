import { ReactNode, Suspense, useRef } from 'react'
import { Canvas, Size, useFrame, useThree, Vector3 } from '@react-three/fiber'
import {
  Center,
  Cone,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
  OrthographicCamera,
  RoundedBox,
  Sphere,
  Stars,
  Text3D,
  Torus,
} from '@react-three/drei'
import { useAnimatedGLTF } from '../hooks/useAnimatedGLTF'
import { useReducedMotion } from 'framer-motion'

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
    </div>
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
      <Boxy size={0.5} position={[getX(0.15), getY(0.68), 0]} />
      <Torusy position={[getX(0.7), getY(0.15), 0]} color="#EB1E99" />
      <TwistyBoxy
        position={[getX(0.1), getY(0.42), 0]}
        size={1.5}
        color="#c8ff00"
      />
      <Boxy size={0.5} position={[getX(0.37), getY(0.95), 0]} />
      <Boxy size={0.5} position={[getX(0.1), getY(0.1), 0]} />
      <Coney size={1} position={[getX(0.95), getY(0.5), 0]} color="red" />
      <YouMadeItText position={[getX(0.45), getY(0.3), 0]} />
      <Suspense fallback={null}>
        <Spin position={[getX(0.45), getY(0.3), 0]}>
          <Birb scale={0.3} position={[2, 0, 0]} />
        </Spin>
      </Suspense>
    </>
  )
}

const Spin = ({
  position,
  children,
}: {
  position?: Vector3
  children: ReactNode
}) => {
  const prefersReducedMotion = useReducedMotion()
  const group = useRef<any>()
  useFrame(() => {
    if (!group.current || prefersReducedMotion) return

    group.current.rotation.y -= 0.002
  })

  return (
    <group ref={group} position={position}>
      {children}
    </group>
  )
}

const getUtils = (size: Size) => {
  const getX = (factor: number) => {
    return size.width * factor - size.width / 2
  }
  const getY = (factor: number) => {
    return size.height * factor - size.height / 2
  }

  return { getX, getY }
}

const Boxy = ({ position, size }: { size: number; position: Vector3 }) => {
  const prefersReducedMotion = useReducedMotion()
  const mesh = useRef<any>()
  useFrame(() => {
    if (!mesh.current || prefersReducedMotion) return

    mesh.current.rotation.x =
      mesh.current.rotation.y =
      mesh.current.rotation.z +=
        0.002
  })

  return (
    <RoundedBox
      ref={mesh}
      args={[size, size, size]}
      position={position}
      radius={0.1}
      smoothness={4}
    >
      <meshLambertMaterial color="palevioletred" />
    </RoundedBox>
  )
}

const Sphery = ({
  position,
  size,
  color,
}: {
  size: number
  position: Vector3
  color: string
}) => {
  const prefersReducedMotion = useReducedMotion()
  return (
    <Sphere visible position={position} args={[size, 16, 200]}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.5} // Strength, 0 disables the effect (default=1)
        speed={prefersReducedMotion ? 0 : 2} // Speed (default=1)
        roughness={0}
      />
    </Sphere>
  )
}

const Torusy = ({ position, color }: { position: Vector3; color: string }) => {
  const prefersReducedMotion = useReducedMotion()
  const mesh = useRef<any>()
  useFrame(() => {
    if (!mesh.current || prefersReducedMotion) return

    mesh.current.rotation.x =
      mesh.current.rotation.y =
      mesh.current.rotation.z +=
        0.002
  })

  return (
    <Torus ref={mesh} args={[1.5, 0.5, 32, 156]} position={position}>
      <MeshWobbleMaterial
        attach="material"
        color={color}
        factor={3} // Strength, 0 disables the effect (default=1)
        speed={prefersReducedMotion ? 0 : 0.5} // Speed (default=1)
        roughness={0}
      />
    </Torus>
  )
}

const TwistyBoxy = ({
  position,
  size,
  color,
}: {
  size: number
  position: Vector3
  color: string
}) => {
  const prefersReducedMotion = useReducedMotion()
  const mesh = useRef<any>()
  useFrame(() => {
    if (!mesh.current || prefersReducedMotion) return

    mesh.current.rotation.x =
      mesh.current.rotation.y =
      mesh.current.rotation.z +=
        0.002
  })

  return (
    <RoundedBox
      ref={mesh}
      args={[size, size, size]}
      radius={0.1}
      smoothness={4}
      position={position}
    >
      <MeshWobbleMaterial
        attach="material"
        color={color}
        factor={2} // Strength, 0 disables the effect (default=1)
        speed={prefersReducedMotion ? 0 : 1.5} // Speed (default=1)
        roughness={0}
      />
    </RoundedBox>
  )
}

const Coney = ({
  position,
  size,
  color,
}: {
  size: number
  position: Vector3
  color: string
}) => {
  const prefersReducedMotion = useReducedMotion()
  const mesh = useRef<any>()
  useFrame(() => {
    if (!mesh.current || prefersReducedMotion) return

    mesh.current.rotation.x =
      mesh.current.rotation.y =
      mesh.current.rotation.z +=
        0.002
  })

  return (
    <Cone ref={mesh} args={[size, size * 3, 32]} position={position}>
      <MeshWobbleMaterial
        attach="material"
        color={color}
        factor={2} // Strength, 0 disables the effect (default=1)
        speed={prefersReducedMotion ? 0 : 1.5} // Speed (default=1)
        roughness={0}
      />
    </Cone>
  )
}

const YouMadeItText = ({ position }: { position: Vector3 }) => {
  const prefersReducedMotion = useReducedMotion()
  const mesh = useRef<any>()
  useFrame(() => {
    if (!mesh.current || prefersReducedMotion) return

    mesh.current.rotation.x = mesh.current.rotation.z += 0.0001
  })

  return (
    <Center position={position}>
      <Text3D
        ref={mesh}
        curveSegments={32}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.1}
        height={0.5}
        lineHeight={0.7}
        letterSpacing={0.06}
        size={0.7}
        font="/Inter_Bold.json"
      >
        {`you\nmade\nit!`}
        <MeshDistortMaterial
          color={'dodgerblue'}
          attach="material"
          distort={0.2} // Strength, 0 disables the effect (default=1)
          speed={prefersReducedMotion ? 0 : 1} // Speed (default=1)
          roughness={0}
        />
      </Text3D>
    </Center>
  )
}

function Birb({ play = 'Dance', ...props }) {
  const prefersReducedMotion = useReducedMotion()
  // @ts-ignore
  const { ref, nodes, materials } = useAnimatedGLTF(
    '/models/Pigeon.glb',
    prefersReducedMotion ? 'Idle' : play
  )
  return (
    // @ts-ignore
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Pigeon_Blob_Eyes">
            <skinnedMesh
              name="Cube228"
              // @ts-ignore
              geometry={nodes.Cube228.geometry}
              material={materials.Pigeon_Main}
              // @ts-ignore
              skeleton={nodes.Cube228.skeleton}
            />
            <skinnedMesh
              name="Cube228_1"
              // @ts-ignore
              geometry={nodes.Cube228_1.geometry}
              material={materials.Pigeon_Secondary}
              // @ts-ignore
              skeleton={nodes.Cube228_1.skeleton}
            />
            <skinnedMesh
              name="Cube228_2"
              // @ts-ignore
              geometry={nodes.Cube228_2.geometry}
              material={materials.Eye_White}
              // @ts-ignore
              skeleton={nodes.Cube228_2.skeleton}
            />
            <skinnedMesh
              name="Cube228_3"
              // @ts-ignore
              geometry={nodes.Cube228_3.geometry}
              material={materials.Eye_Black}
              // @ts-ignore
              skeleton={nodes.Cube228_3.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/models/Pigeon.glb')

export default ThreeDeeBackground
