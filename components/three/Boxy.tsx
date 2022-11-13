import { useRef } from 'react'
import { useFrame, Vector3 } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import { Mesh } from 'three'

export const Boxy = ({
  position,
  size,
}: {
  size: number
  position: Vector3
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
      position={position}
      radius={0.1}
      smoothness={4}
    >
      <meshLambertMaterial color="palevioletred" />
    </RoundedBox>
  )
}
