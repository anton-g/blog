import React from 'react'

export default function Test() {
  const height = 120
  const middleRight = 100 // 68
  const middleLeft = -10 // 0

  return (
    <div>
      <svg
        width="90"
        height="120"
        viewBox="0 0 90 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          //                     D?
          d={`M21 0 H68 Q${middleRight} ${height /
            2} 68 ${height} H21 Q${middleLeft} ${height / 2} 21 0 Z`}
          fill="#C4C4C4"
          stroke="black"
        />
      </svg>
    </div>
  )
}
