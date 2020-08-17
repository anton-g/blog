import React, { useState } from 'react'
import { SOUND_MODE_KEY } from './constants'

export const SoundContext = React.createContext(true)

export const SoundProvider = ({ children }) => {
  const [soundMode, setSoundMode] = useLocalStorage(SOUND_MODE_KEY, true)

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

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}
