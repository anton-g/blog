import { Vector3 } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'

export const Sphery = ({
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
