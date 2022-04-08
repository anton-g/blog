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
        <AllPosts>All posts -&gt;</AllPosts>
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
  }
`

const AllPosts = styled.a`
  align-self: flex-end;
`
