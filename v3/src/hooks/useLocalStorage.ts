import { useEffect } from 'react'
import { useState } from 'react'

export function useLocalStorage(key: string, initialValue: any) {
  const initialize = (key: string) => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  }
  const [storedValue, setStoredValue] = useState<any>()
  useEffect(() => {
    setStoredValue(initialize(key))
  }, [])

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}
