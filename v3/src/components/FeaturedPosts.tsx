import Link from 'next/link'
import styled from 'styled-components'
import { Spacer } from './Spacer'
import { BouncyArrowLink } from './BouncyArrowLink'

export const FeaturedPosts = () => {
  return (
    <Wrapper>
      <Heading>Selected writing</Heading>
      <Posts>
        <Post href="/posts/react-component-code-smells">React Component Code Smells</Post>
        <Spacer size={48} />
        <Post href="/posts/software-development-is-a-social-profession">
          Software Development is a Social Profession
        </Post>
        <Spacer size={48} />
        <Post href="/posts/render-props">Render Props in the Age of Hooks</Post>
      </Posts>
      <BouncyArrowLink text="All posts" href="/posts" />
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

const Post = styled(Link)`
  font-family: var(--font-abril);
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
