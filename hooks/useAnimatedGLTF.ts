import { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { ObjectMap } from '@react-three/fiber'

export function useAnimatedGLTF<ModelGLTF extends GLTF & ObjectMap>(
  url: string,
  play: string
) {
  const { animations, ...rest } = useGLTF(url) as unknown as ModelGLTF
  const { ref, actions } = useAnimations(animations)

  useEffect(() => {
    const action = actions[play]
    if (action) {
      action.timeScale = 0.5 + Math.random() * 0.5
      action.reset().fadeIn(0.5).play()
      return () => action.fadeOut(0.5)
    }

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play])
  return {
    ref,
    animations,
    ...rest,
  } as const
}

useAnimatedGLTF.preload = useGLTF.preload
