import { Link } from '@remix-run/react'
import { BouncyArrowLink } from './BouncyArrowLink'
import { ComponentProps } from 'react'

export const FeaturedPosts = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-center text-gray-950">Selected posts</h2>
      <div className="flex gap-12 flex-col lg:flex-row">
        <Post to="/posts/react-component-code-smells">React Component Code Smells</Post>
        <Post to="/posts/software-development-is-a-social-profession">
          Software Development is a Social Profession
        </Post>
        <Post to="/posts/render-props">Render Props in the Age of Hooks</Post>
      </div>
      <BouncyArrowLink href="/posts">All posts</BouncyArrowLink>
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
