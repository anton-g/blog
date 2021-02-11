import React from 'react'
import styled from 'styled-components'

function Mention({ data }) {
  return (
    <Wrapper>
      <CardLink href={data.url} />
      <AvatarLink href={data.author.url}>
        <MentionAvatar src={data.author.photo} alt={data.author.name} />
      </AvatarLink>
      <Content dangerouslySetInnerHTML={{ __html: data.content }} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  text-decoration: none;
  padding: 8px;
  margin: -8px;
  margin-bottom: 8px;
  position: relative;

  &:hover {
    background-color: var(--color-background-contrast);
  }
`

const CardLink = styled.a`
  position: static;

  &::before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`

const randomRadius = () => {
  const radiuses = [
    '71% 29% 64% 36% / 61% 35% 65% 39%',
    '38% 62% 42% 58% / 61% 49% 51% 39%',
    '57% 43% 23% 77% / 76% 35% 65% 24%',
    '57% 43% 72% 28% / 29% 77% 23% 71%'
  ]

  return radiuses[Math.floor(Math.random() * radiuses.length)]
}

const AvatarLink = styled.a`
  width: 40px;
  height: 40px;
  margin-right: 8px;
  position: relative;
  z-index: 1;
`

const MentionAvatar = styled.img`
  width: 40px;
  height: 40px;
  border: 2px solid transparent;
  border-radius: ${() => randomRadius()};

  &:hover {
    border-color: var(--color-primary);
  }
`

const Content = styled.div`
  margin: 0;
  padding: 0;
  font-size: 12px;

  a {
    position: relative;
    z-index: 1;

    &:hover {
      color: var(--color-primary);
    }
  }
`

export default Mention
