import { useRef } from 'react'

// eslint not check next line
// eslint-disable-next-line
export const useDebouncedChange = (callback: Function, delay: number) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // eslint-disable-next-line
  const debouncedChange = (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  return debouncedChange
}
