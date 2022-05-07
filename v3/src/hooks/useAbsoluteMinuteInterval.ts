import { useState } from 'react'
import { useInterval } from './useInterval'

export const useAbsoluteMinuteInterval = (callback: () => void) => {
  const [time, setTime] = useState(() => {
    const margin = 0.1
    return (60 + margin - new Date().getSeconds()) * 1000
  })

  useInterval(() => {
    if (time !== 60_000) setTime(60_000)

    callback()
  }, time)
}
