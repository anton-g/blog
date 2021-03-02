import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../../../ThemeContext'

function Likes({ likes }) {
  const { colorMode } = useContext(ThemeContext)

  return (
    <LikesWrapper dark={colorMode === 'dark'}>
      <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
      </Icon>
      <List>
        {likes.map(({ data, id }) => (
          <LikeLink href={data.author.url} key={id}>
            <LikeAvatar src={data.author.photo} alt={data.author.name}></LikeAvatar>
          </LikeLink>
        ))}
      </List>
    </LikesWrapper>
  )
}

const Icon = styled.svg`
  height: 20px;
  color: var(--color-text);
  opacity: 0.6;
  margin-right: 8px;
`

const LikeAvatar = styled.img`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid var(--color-background);
  z-index: 1;
  transition: border-color 0.2s, filter 0.2s, margin-right 0.4s;

  &:hover {
    border-color: var(--color-primary);
    z-index: 2;
    margin-right: 12px;
  }
`

const LikesWrapper = styled.div`
  display: inline-flex;
  margin-bottom: 16px;
  align-items: center;
  line-height: 0;

  &:hover {
    ${LikeAvatar}:not(:hover) {
      filter: grayscale(1) brightness(${props => (props.dark ? 0.5 : 1.5)});
    }
  }
`

const List = styled.div`
  display: flex;

  > :not(:first-child) {
    margin-left: -12px;
  }
`

const LikeLink = styled.a``

export default Likes
