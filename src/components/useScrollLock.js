import { useLayoutEffect, useState } from 'react'

export default function useScrollLock(lock) {
  const [originalStyle, setOriginalStyle] = useState(null)

  useLayoutEffect(() => {
    setOriginalStyle(window.getComputedStyle(document.body).overflow)
  }, [])

  useLayoutEffect(() => {
    if (lock) document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = originalStyle)
  }, [originalStyle, lock])
}
