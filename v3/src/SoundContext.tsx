import React, { createContext, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'

const key = 'sound-mode'

type SoundState = {
  soundMode: boolean
  setSoundMode: (value: boolean) => void
}

export const SoundContext = createContext<SoundState>(null!)

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [soundMode, setSoundMode] = useLocalStorage('sound-mode', true)

  return (
    <SoundContext.Provider
      value={{
        soundMode,
        setSoundMode,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}
