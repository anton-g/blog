import { useRef } from 'react'
import { useFrame, Vector3 } from '@react-three/fiber'
import { Cone, MeshWobbleMaterial } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import { Mesh } from 'three'

export const Coney = ({
  position,
  size,
  color,
}: {
  size: number
  position: Vector3
  color: string
}) => {
  const prefersReducedMotion = useReducedMotion()
  const mesh = useRef<Mesh>()
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
