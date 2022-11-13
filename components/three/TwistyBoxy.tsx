import { useRef } from 'react'
import { useFrame, Vector3 } from '@react-three/fiber'
import { MeshWobbleMaterial, RoundedBox } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import { Mesh } from 'three'

export const TwistyBoxy = ({
  position,
  size,
  color,
}: {
  size: number
  position: Vector3
  color: string
}) => {
  const prefersReducedMotion = useReducedMotion()
  const mesh = useRef<Mesh>(null!)
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
