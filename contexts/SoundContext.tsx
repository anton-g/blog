import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

type SoundState = {
  soundMode: boolean
  setSoundMode: (value: boolean) => void
}

const SoundContext = createContext<SoundState>(null!)

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

export const useSoundMode = () => {
  return useContext(SoundContext)
}
