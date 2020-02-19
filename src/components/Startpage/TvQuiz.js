import React from 'react'
import styled from 'styled-components'
import tv from './tv.svg'

export default function TvQuiz() {
  return (
    <Wrapper>
      <Link href="https://tv-show-quiz.netlify.com">
        <img src={tv} width="60%" height="80%"></img>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-column-start: 2 span;
  grid-row-start: 1 span;
  width: 100%;
  height: 100%;

  background-color: #75b79e;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23ddfff2' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");
`

const Link = styled.a`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    transition: transform 0.5s ease-in-out;
    transform: scale(1);
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`
