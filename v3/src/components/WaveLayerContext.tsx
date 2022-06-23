import { createContext, ReactNode, useState, useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useAbsoluteMinuteInterval } from '../hooks/useAbsoluteMinuteInterval'
import { Claim } from '../pages/api/claims'
import { getDayAndMinute } from '../utils/time'

export type Wave = { x: number; y: number; name: string }

const WaveLayerContext = createContext<{
  claiming: string | null
  setClaiming: (name: string | null) => void
  currentWave: Wave | null
}>(null!)

export const WaveLayerProvider = ({ children }: { children: ReactNode }) => {
  const [claiming, setClaiming] = useState<string | null>(null)
  const [currentWave, setCurrentWave] = useState<Wave | null>(null)

  const { data } = useQuery<Claim[] | { error: string }>(
    'claims',
    () => {
      return fetch('/api/claims').then((r) => r.json())
    },
    {
      refetchInterval: 1000 * 60 * 10,
    }
  )

  useAbsoluteMinuteInterval(() => {
    const { day, minute } = getDayAndMinute()

    if (!data || 'error' in data) return

    const current = data.find((x) => x.minute === minute && x.day === day)
    setCurrentWave(current || null)

    if (current) {
      setClaiming(null)
    }
  })

  useEffect(() => {
    const { day, minute } = getDayAndMinute()

    if (!data || 'error' in data) return

    const current = data.find((x) => x.minute === minute && x.day === day)
    if (current) setCurrentWave(current)
  }, [data])

  return (
    <WaveLayerContext.Provider value={{ claiming, setClaiming, currentWave }}>{children}</WaveLayerContext.Provider>
  )
}

export const useWaveLayer = () => useContext(WaveLayerContext)
