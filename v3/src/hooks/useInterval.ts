import React, { useState, useEffect, useRef } from 'react'

export function useInterval(callback: Function, delay: number) {
  const savedCallback = useRef<typeof callback>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
