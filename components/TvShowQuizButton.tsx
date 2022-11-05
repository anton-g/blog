import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

export const TvShowQuiz = () => {
  return (
    <Wrapper href="/">
      <Inner>
        <TvShow>
          TV Show
          <br />
          Ratings Quiz
        </TvShow>
        <TvImage
          src={'/tvshowquiz.png'}
          width={138}
          height={92}
          alt="Old tv with text tv show quiz written on it"
        />
      </Inner>
    </Wrapper>
  )
}

const TvShow = styled.div`
  background-color: var(--color-gray12);
  color: var(--color-gray1);
  padding: 8px 16px;
  font-family: var(--font-abril);
  letter-spacing: 1px;
  white-space: nowrap;
  display: block;
  font-size: 16px;
  backface-visibility: hidden;

  @media (max-width: 931px) {
    margin: 0;
    margin-right: -64px;
  }
`

const TvImage = styled(Image)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateX(180deg);
  backface-visibility: hidden;
`

const Inner = styled.div`
  transition: transform 0.8s;
  transform-style: preserve-3d;
  position: relative;
  width: 100%;
  height: 100%;
`

const Wrapper = styled(Link)`
  position: relative;
  perspective: 400px;

  &:hover {
    ${Inner} {
      transform: rotateX(540deg);
    }
  }
`
