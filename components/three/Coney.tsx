import { useRef, useState } from 'react'
import { useFrame, Vector3 } from '@react-three/fiber'
import { Cone, MeshWobbleMaterial } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import { Mesh } from 'three'
import { a, useSpring } from '@react-spring/three'

export const Coney = ({
  position,
  size,
  color,
}: {
  size: number
  position: Vector3
  color: string
}) => {
  const [scale, setScale] = useState(1)

  const prefersReducedMotion = useReducedMotion()
  const mesh = useRef<Mesh>()
  useFrame(() => {
    if (!mesh.current || prefersReducedMotion) return

    mesh.current.rotation.x =
      mesh.current.rotation.y =
      mesh.current.rotation.z +=
        0.002
  })

  const { scaleSpring } = useSpring({
    scaleSpring: scale,
    config: { mass: 3, tension: 400, friction: 30, precision: 0.0001 },
  })

  return (
    <AnimatedCone
      ref={mesh}
      args={[size, size * 3, 32]}
      position={position}
      scale={scaleSpring}
      onClick={() => {
        if (scale === 0.3) {
          setScale(2)
        } else if (scale === 1) {
          setScale(0.3)
        } else {
          setScale(1)
        }
      }}
    >
      <MeshWobbleMaterial
        attach="material"
        color={color}
        factor={2} // Strength, 0 disables the effect (default=1)
        speed={prefersReducedMotion ? 0 : 1.5} // Speed (default=1)
        roughness={0}
      />
    </AnimatedCone>
  )
}

const AnimatedCone = a(Cone)
