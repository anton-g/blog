import React, { useState, useEffect } from 'react'
import useIntersect from '../useIntersect'

export default function BlockWrapper({ children, className }) {
  const [intersected, setIntersected] = useState(false)
  const [ref, { isIntersecting }] = useIntersect({
    rootMargin: '0px 0px 40px 0px',
  })

  useEffect(() => {
    setIntersected(prev => prev || isIntersecting)
  }, [isIntersecting])

  return (
    <div className={className} ref={ref}>
      {intersected && children}
    </div>
  )
}
