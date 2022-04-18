import Link from 'next/link'
import styled, { keyframes } from 'styled-components'
import { Spacer } from './Spacer'

export const FeaturedPosts = () => {
  return (
    <Wrapper>
      <Heading>Selected writing</Heading>
      <Posts>
        <Link href="/posts/react-component-code-smells" passHref>
          <Post>React Component Code Smells</Post>
        </Link>
        <Spacer size={48} />
        <Link href="/posts/software-development-is-a-social-profession" passHref>
          <Post>Software Development is a Social Profession</Post>
        </Link>
        <Spacer size={48} />
        <Link href="/posts/render-props" passHref>
          <Post>Render Props in the Age of Hooks</Post>
        </Link>
      </Posts>
      <Spacer size={16} />
      <Link href="/posts" passHref>
        <AllPosts>
          All posts{' '}
          <svg width="60" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 5.25H.25v1.5H1v-1.5Zm14.5 1.5a.75.75 0 0 0 0-1.5v1.5ZM1 6.75h14.5v-1.5H1v1.5Z"
              fill="currentColor"
            />
            <path
              d="m11 1 4.646 4.646a.5.5 0 0 1 0 .708L11 11"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </AllPosts>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Posts = styled.div`
  display: flex;

  @media (max-width: 931px) {
    flex-direction: column;
  }
`

const Heading = styled.h2`
  font-weight: normal;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray12};
`

const Post = styled.a`
  font-family: 'Abril Fatface';
  font-size: 2rem;
  min-width: 280px;
  max-width: 280px;
  text-align: center;
  font-kerning: normal;
  letter-spacing: 1px;

  @media (min-width: 930px) {
    &:first-child {
      text-align: right;
    }

    &:last-child {
      text-align: left;
    }
  }

  &:hover {
    text-decoration: underline ${({ theme }) => theme.colors.primary11} wavy;
    text-decoration-skip-ink: none;
  }
`

const AllPosts = styled.a`
  align-self: flex-end;
`
