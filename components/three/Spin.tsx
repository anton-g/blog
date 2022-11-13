import { ReactNode, useRef } from 'react'
import { useFrame, Vector3 } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { Group } from 'three'

export const Spin = ({
  position,
  children,
}: {
  position?: Vector3
  children: ReactNode
}) => {
  const prefersReducedMotion = useReducedMotion()
  const group = useRef<Group>(null!)
  useFrame(() => {
    if (!group.current || prefersReducedMotion) return

    group.current.rotation.y -= 0.003
  })

  return (
    <group ref={group} position={position}>
      {children}
    </group>
  )
}
