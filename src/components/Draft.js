import React from 'react'

export default function Draft() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        background:
          'repeating-linear-gradient(45deg,#fff8a6,#fff8a6 10px,black 10px,black 20px)',
        color: 'white',
        fontWeight: 'bold',
        textShadow:
          '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        textAlign: 'center',
      }}
    >
      DRAFT
    </div>
  )
}
