import styled, { CSSProperties, keyframes } from 'styled-components'
import ProjectLink from './ProjectLink'

export const PodcastButton = ({ style }: { style?: CSSProperties }) => {
  return (
    <Wrapper style={style}>
      <Asdf href="/">
        asdf.pizza{' '}
        <SoundWidget>
          <Icon>
            <span />
            <span />
            <span />
            <span />
          </Icon>
          <span>🇸🇪</span>
        </SoundWidget>
      </Asdf>
    </Wrapper>
  )
}

const bounce = keyframes`
  10% {
    transform: scaleY(0.3);
  }

  30% {
    transform: scaleY(1);
  }

  60% {
    transform: scaleY(0.5);
  }

  80% {
    transform: scaleY(0.75);
  }

  100% {
    transform: scaleY(0.6);
  }
`

const bob = keyframes`
  0% {
		transform: translateY(-8px);
	}
	50% {
		transform: translateY(-4px);
	}
	100% {
		transform: translateY(-8px);
	}
`

const bobFloat = keyframes`
  100% {
    transform: translateY(-8px);
  }
`

const Icon = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: space-between;
  width: 20px;
  height: 18px;
  opacity: 0;
  transition: opacity 300ms;

  & > span {
    width: 3px;
    height: 100%;
    background-color: var(--color-primary9);
    border-radius: 3px;
    transform-origin: bottom;
    transition: opacity 0.3s ease-out;
    animation: ${bounce} 2.2s ease infinite alternate;
    content: '';

    &:nth-of-type(2) {
      animation-delay: -2.2s;
    }

    &:nth-of-type(3) {
      animation-delay: -3.7s;
    }

    &:nth-of-type(4) {
      animation-delay: -1.1s;
    }
  }
`

const SoundWidget = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0 auto;
  font-weight: 500;
  font-size: 24px;
  position: relative;

  > span {
    position: absolute;
    left: -2px;
    transition: opacity 300ms;
  }
`

const Wrapper = styled.div`
  position: relative;

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      animation-name: ${bobFloat}, ${bob};
      animation-duration: 0.3s, 1.5s;
      animation-delay: 0s, 0.3s;
      animation-timing-function: ease-out, ease-in-out;
      animation-iteration-count: 1, infinite;
      animation-fill-mode: forwards;
      animation-direction: normal, alternate;

      ${SoundWidget} {
        ${Icon} {
          opacity: 1;
        }

        > span {
          opacity: 0;
        }
      }
    }
  }
`

const Asdf = styled(ProjectLink)`
  @media (max-width: 931px) {
  }
`
