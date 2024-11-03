import { CSSProperties } from 'react'
import { ProjectLink } from './ProjectLink'

export const AreasButton = ({ style }: { style?: CSSProperties }) => {
  return (
    <ProjectLink
      to="https://areas.rymdkrog.world"
      style={style}
      className="group relative border-4 border-gray-950 py-0"
    >
      <div className="w-0 h-full top-0 left-0 z-10 absolute bg-gray-50 group-hover:animate-width group-focus:animate-width" />
      <span className="z-20 relative mix-blend-difference">areas</span>
    </ProjectLink>
  )
}
