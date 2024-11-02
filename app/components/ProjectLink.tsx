import { Link } from '@remix-run/react'
import { ComponentProps } from 'react'
import { cn } from '~/other/misc'

export const ProjectLink = ({ children, className, ...props }: ComponentProps<typeof Link>) => {
  return (
    <Link
      {...props}
      className={cn(
        'tracking-[1px] whitespace-nowrap bg-gray-950 text-gray-50 py-2 px-4 font-serif text-2xl',
        className
      )}
    >
      {children}
    </Link>
  )
}
