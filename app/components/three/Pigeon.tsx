import { useReducedMotion } from 'framer-motion'
import { GLTF } from 'three-stdlib'
import { GroupProps } from '@react-three/fiber'
import { useState } from 'react'
import { AnimationAction, Bone, MeshStandardMaterial, SkinnedMesh } from 'three'
import { useAnimatedGLTF } from '~/hooks/useAnimatedGLTF'

type PigeonGLTF = GLTF & {
  nodes: {
    Cube228: SkinnedMesh
    Cube228_1: SkinnedMesh
    Cube228_2: SkinnedMesh
    Cube228_3: SkinnedMesh
    Body: Bone
    Head: Bone
  }
  materials: {
    Pigeon_Main: MeshStandardMaterial
    Pigeon_Secondary: MeshStandardMaterial
    Eye_White: MeshStandardMaterial
    Eye_Black: MeshStandardMaterial
  }
}

type ActionName = 'Bite_Front' | 'Dance' | 'Death' | 'HitRecieve' | 'Idle' | 'Jump' | 'No' | 'Walk' | 'Yes'

export type PigeonActions = Record<ActionName, AnimationAction>

export function Pigeon(props: GroupProps) {
  const [play, setPlay] = useState<ActionName>('Dance')

  const prefersReducedMotion = useReducedMotion()
  const { ref, nodes, materials } = useAnimatedGLTF<PigeonGLTF>(
    '/models/Pigeon.glb',
    prefersReducedMotion ? 'Idle' : play
  )

  return (
    <group
      // @ts-ignore
      ref={ref}
      {...props}
      dispose={null}
      onClick={() => {
        if (play === 'Dance') {
          setPlay('Walk')
        } else if (play === 'Walk') {
          setPlay('Jump')
        } else {
          setPlay('Dance')
        }
      }}
    >
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Pigeon_Blob_Eyes">
            <skinnedMesh
              name="Cube228"
              geometry={nodes.Cube228.geometry}
              material={materials.Pigeon_Main}
              skeleton={nodes.Cube228.skeleton}
            />
            <skinnedMesh
              name="Cube228_1"
              geometry={nodes.Cube228_1.geometry}
              material={materials.Pigeon_Secondary}
              skeleton={nodes.Cube228_1.skeleton}
            />
            <skinnedMesh
              name="Cube228_2"
              geometry={nodes.Cube228_2.geometry}
              material={materials.Eye_White}
              skeleton={nodes.Cube228_2.skeleton}
            />
            <skinnedMesh
              name="Cube228_3"
              geometry={nodes.Cube228_3.geometry}
              material={materials.Eye_Black}
              skeleton={nodes.Cube228_3.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useAnimatedGLTF.preload('/models/Pigeon.glb')
