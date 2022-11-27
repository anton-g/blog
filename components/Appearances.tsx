import styled from 'styled-components'
import { BouncyArrowLink } from './BouncyArrowLink'
import { Spacer } from './Spacer'

export const Appearances = () => {
  return (
    <Wrapper>
      <Heading>Selected talks</Heading>
      <Posts>
        <Post href="/">CSS *is* awesome</Post>
        <Post href="/">It&apos;s always better when we&apos;re together</Post>
        <Post href="/">Into the Visual World of State Machines</Post>
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 36px 48px;
  @media (max-width: 931px) {
    grid-template-columns: 1fr;
  }
`

const Heading = styled.h2`
  font-weight: normal;
  text-align: center;
  color: var(--color-gray12);
`

const Post = styled.a`
  font-family: var(--font-abril);
  font-size: 2rem;
  max-width: 340px;
  text-align: center;
  font-kerning: normal;
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;

  @media (min-width: 930px) {
    &:first-child {
      text-align: right;
    }
    &:last-child {
      text-align: left;
    }
  }
  &:hover {
    text-decoration: underline var(--color-primary11) wavy;
    text-decoration-skip-ink: none;
  }
`

const AllPosts = styled.a`
  align-self: flex-end;
`
