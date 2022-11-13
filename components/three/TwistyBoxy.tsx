import { useRef, useState } from 'react'
import { useFrame, Vector3 } from '@react-three/fiber'
import { MeshWobbleMaterial, RoundedBox } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import { Mesh } from 'three'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'

export const TwistyBoxy = ({
  position,
  size,
}: {
  size: number
  position: Vector3
}) => {
  const [active, setActive] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const mesh = useRef<Mesh>(null!)
  useFrame(() => {
    if (!mesh.current || prefersReducedMotion) return

    mesh.current.rotation.x =
      mesh.current.rotation.y =
      mesh.current.rotation.z +=
        0.002
  })

  const { spring } = useSpring({
    spring: active,
    config: { mass: 1, tension: 20, friction: 50, precision: 0.0001 },
  })

  const factor = spring.to([0, 1], [2, 3])
  const color = spring.to([0, 1], ['#c8ff00', '#22577A'])

  return (
    <RoundedBox
      ref={mesh}
      args={[size, size, size]}
      radius={0.1}
      smoothness={4}
      position={position}
      onPointerEnter={() => setActive(1)}
      onPointerLeave={() => setActive(0)}
    >
      {/* @ts-ignore */}
      <AnimatedMeshWobbleMaterial
        attach="material"
        color={color}
        factor={factor} // Strength, 0 disables the effect (default=1)
        speed={prefersReducedMotion ? 0 : 1.5} // Speed (default=1)
        roughness={0}
      />
    </RoundedBox>
  )
}

const AnimatedMeshWobbleMaterial = a(MeshWobbleMaterial)
