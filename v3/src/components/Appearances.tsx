import Link from 'next/link'
import styled from 'styled-components'
import { BouncyArrowLink } from './BouncyArrowLink'
import { Spacer } from './Spacer'

export const Appearances = () => {
  return (
    <Wrapper>
      <Heading>Selected appearances</Heading>
      <Posts>
        <Post href="/">It&apos;s always better when we&apos;re together</Post>
        <Spacer size={48} />
        <Post href="/">Kodsnack 465 - En liknelse som flyger 🇸🇪</Post>
        <Spacer size={48} />
        <Post href="/">Kodsnack 409 - Komplex och komplicerad 🇸🇪</Post>
      </Posts>
      <Spacer size={16} />
      <BouncyArrowLink href="/appearances" text="All appearances" />
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
