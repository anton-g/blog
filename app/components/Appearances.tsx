import { Link } from '@remix-run/react'
import { BouncyArrowLink } from './BouncyArrowLink'
import { ComponentProps } from 'react'
import { cn } from '~/other/misc'

export const Appearances = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <h2 className="text-center">Selected talks</h2>
      <div className="grid lg:grid-cols-3 gap-y-9 gap-x-12 grid-cols-1">
        <Post to="https://www.youtube.com/watch?v=uo3px1L3H70">CSS *is* awesome</Post>
        <Post to="https://youtu.be/q7bAYxZMJho?t=3586">It&apos;s always better when we&apos;re together</Post>
        <Post to="https://www.youtube.com/watch?v=GYSD0JudjwI&t=125s">
          Into the Visual World of State Machines
        </Post>
      </div>
      <BouncyArrowLink href="/appearances">All appearances</BouncyArrowLink>
    </div>
  )
}

const Post = ({ children, ...props }: ComponentProps<typeof Link>) => {
  return (
    <Link
      {...props}
      className="tracking-wider font-serif text-3xl min-w-72 max-w-[350px] text-pretty text-center hover:underline decoration-wavy lg:first-of-type:text-right lg:last-of-type:text-left decoration-rose-500"
    >
      {children}
    </Link>
  )
}
