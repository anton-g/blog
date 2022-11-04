import { useEffect } from 'react'
import { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const initialize = (key: string) => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  }
  const [storedValue, setStoredValue] = useState<T>({} as T)
  useEffect(() => {
    setStoredValue(initialize(key))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue] as const
}
