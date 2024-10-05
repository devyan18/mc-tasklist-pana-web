import { useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (!item) {
        throw new Error('Item not found')
      }

      return JSON.parse(item) as T
    } catch (error) {
      console.error(error)
      window.localStorage.setItem(key, JSON.stringify(initialValue))
      return initialValue
    }
  })
  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    value: storedValue,
    setValue,
    removeValue,
  }
}
