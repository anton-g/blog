import { CSSProperties } from 'react'
import { ProjectLink } from './ProjectLink'

// @media (max-width: 931px) {
//   margin: 0;
//   margin-left: -92px;
// }
export const CharadgeneratornButton = ({ style }: { style?: CSSProperties }) => {
  return (
    <ProjectLink
      className="mr-2 group"
      to="https://charadgeneratorn.se/"
      style={style}
      onAnimationEnd={(e) => e.stopPropagation()}
    >
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-100">
        C
      </span>
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-200">
        h
      </span>
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-300">
        a
      </span>
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-400">
        r
      </span>
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-500">
        a
      </span>
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-600">
        d
      </span>
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-700">
        g
      </span>
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-800">
        e
      </span>
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-900">
        n
      </span>
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-1000">
        e
      </span>
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-1100">
        r
      </span>
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-1200">
        a
      </span>
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-1300">
        t
      </span>
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-1400">
        o
      </span>
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-1500">
        r
      </span>
      <span className="group-hover:animate-bounce group-focus:animate-bounce inline-block !animation-delay-[1600ms]">
        n
      </span>{' '}
      🇸🇪
    </ProjectLink>
  )
}
