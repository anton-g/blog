import { useState, useCallback, useLayoutEffect } from 'react'

function getDimensionObject(node: HTMLElement): DimensionObject {
  const rect = node.getBoundingClientRect()

  return {
    width: rect.width,
    height: rect.height,
    top: 'y' in rect ? rect.y : rect.top,
    left: 'x' in rect ? rect.x : rect.left,
    x: 'x' in rect ? rect.x : rect.left,
    y: 'y' in rect ? rect.y : rect.top,
    right: rect.right,
    bottom: rect.bottom,
  }
}

function useDimensions({ liveMeasure = true }: UseDimensionsArgs = {}): UseDimensionsHook {
  const [dimensions, setDimensions] = useState<DimensionObject | null>(null)
  const [node, setNode] = useState(null!)

  const ref = useCallback((node) => {
    setNode(node)
  }, [])

  useLayoutEffect(() => {
    if (node) {
      const measure = () => window.requestAnimationFrame(() => setDimensions(getDimensionObject(node)))
      measure()

      if (liveMeasure) {
        window.addEventListener('resize', measure)
        window.addEventListener('scroll', measure)

        return () => {
          window.removeEventListener('resize', measure)
          window.removeEventListener('scroll', measure)
        }
      }
    }
  }, [node])

  return [ref, dimensions, node]
}

export default useDimensions

export interface DimensionObject {
  width: number
  height: number
  top: number
  left: number
  x: number
  y: number
  right: number
  bottom: number
}

export type UseDimensionsHook = [(node: HTMLElement) => void, null | DimensionObject, HTMLElement]

export interface UseDimensionsArgs {
  liveMeasure?: boolean
}
