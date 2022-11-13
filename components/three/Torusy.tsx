import { useRef } from 'react'
import { useFrame, Vector3 } from '@react-three/fiber'
import { MeshWobbleMaterial, Torus } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import { Mesh } from 'three'

export const Torusy = ({
  position,
  color,
}: {
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
