import { useRef, useEffect, useCallback } from 'react'
import { random } from '../utils/random'

export const useRandomInterval = (callback: () => void, minDelay: number | null, maxDelay: number | null) => {
  const timeoutId = useRef<number>(null!)
  const savedCallback = useRef(callback)
  useEffect(() => {
    savedCallback.current = callback
  })
  useEffect(() => {
    let isEnabled = typeof minDelay === 'number' && typeof maxDelay === 'number'
    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay as number, maxDelay as number)
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current()
          handleTick()
        }, nextTickAt)
      }
      handleTick()
    }
    return () => window.clearTimeout(timeoutId.current)
  }, [minDelay, maxDelay])
  const cancel = useCallback(function () {
    window.clearTimeout(timeoutId.current)
  }, [])
  return cancel
}
