import { Link } from '@remix-run/react'
import { BouncyArrowLink } from './BouncyArrowLink'
import { ComponentProps } from 'react'

export const Appearances = () => {
  return (
    <div className="flex flex-col gap-4">
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

// const Post = styled.a`
//   font-family: var(--font-abril);
//   font-size: 2rem;
//   max-width: 340px;
//   text-align: center;
//   font-kerning: normal;
//   letter-spacing: 1px;
//   display: flex;
//   flex-direction: column;

//   @media (min-width: 930px) {
//     &:first-child {
//       text-align: right;
//     }
//     &:last-child {
//       text-align: left;
//     }
//   }
//   &:hover {
//     text-decoration: underline var(--color-primary11) wavy;
//     text-decoration-skip-ink: none;
//   }
// `
