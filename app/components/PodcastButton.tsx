import { CSSProperties } from 'react'
import { ProjectLink } from './ProjectLink'

// TODO add tiny T & A heads talking
export const PodcastButton = ({ style }: { style?: CSSProperties }) => {
  return (
    <div className="group relative" style={style} onAnimationEnd={(e) => e.stopPropagation()}>
      <ProjectLink to="https://asdf.pizza">
        asdf.pizza{' '}
        <div className="inline-flex items-center mx-auto text-2xl relative">
          <div className="group-hover:opacity-100 relative inline-flex justify-between w-[20px] h-[18px] opacity-0 transition-opacity duration-300">
            <span
              style={{ content: '' }}
              className="w-[3px] animate-radioBounce origin-bottom h-full bg-white rounded-[3px] transition-opacity duration-300 ease-out"
            />
            <span
              className="w-[3px] animate-radioBounce origin-bottom h-full bg-white rounded-[3px] transition-opacity duration-300 ease-out"
              style={{ content: '', animationDelay: '-2.2s' }}
            />
            <span
              className="w-[3px] animate-radioBounce origin-bottom h-full bg-white rounded-[3px] transition-opacity duration-300 ease-out"
              style={{ content: '', animationDelay: '-3.7s' }}
            />
            <span
              className="w-[3px] animate-radioBounce origin-bottom h-full bg-white rounded-[3px] transition-opacity duration-300 ease-out"
              style={{ content: '', animationDelay: '-1.1s' }}
            />
          </div>
          <span className="group-hover:opacity-0 absolute left-[-2px] transition-opacity duration-300">
            🇸🇪
          </span>
        </div>
      </ProjectLink>
    </div>
  )
}
