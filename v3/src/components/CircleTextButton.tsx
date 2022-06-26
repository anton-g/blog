// https://codepen.io/essingen123/pen/mYwoNQ

import styled, { keyframes } from 'styled-components'

export const CircleTextButton = () => {
  return (
    <Container>
      <Circle>
        <Button>The Button</Button>
        <Svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="300px"
          height="300px"
          viewBox="0 0 300 300"
          enableBackground="new 0 0 300 300"
          xmlSpace="preserve"
        >
          <defs>
            <path
              id="circlePath"
              d="M 150, 150 m -120, 0 a 120,120 0 0,1 240,0 a 120,120 0 0,1 -240,0 "
              // stroke="blue"
              fill="none"
            />
          </defs>
          <circle cx="150" cy="150" r="150" fill="none" />
          <g>
            <use xlinkHref="#circlePath" fill="none" />
            <text fill="currentColor">
              <textPath xlinkHref="#circlePath">I PROMISE YOU THIS BUTTON DOES SOMETHING, REALLY 🤞</textPath>
            </text>
          </g>
        </Svg>
      </Circle>
    </Container>
  )
}

const Container = styled.div`
  margin: -6px;
`

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0);
  }
`

const Svg = styled.svg`
  position: absolute;
  height: 100%;
  width: 100%;
  pointer-events: none;
`

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary9};
  border: 2px solid ${({ theme }) => theme.colors.primary10};
  color: ${({ theme }) => theme.colors.gray1};
  font-family: 'Yeseva One';
  font-size: 22px;
  border-radius: 8px;
  cursor: pointer;
  align-self: center;
  padding: 12px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 300ms cubic-bezier(0, 0, 0.58, 1), background 300ms cubic-bezier(0, 0, 0.58, 1);
  cursor: pointer;
  vertical-align: middle;

  &:hover {
    transform: translate(0, -0.5em);
    &::before {
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary10},
        0 0.5em 0 0 ${({ theme }) => theme.colors.primary4};
      transform: translate3d(0, 0.5em, -1em);
    }
  }

  &:active {
    transform: translate(0em, 0em);
    transition-duration: 75ms;

    &::before {
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary10}, 0 0 ${({ theme }) => theme.colors.primary4};
      transform: translate3d(0, 0, -1px);
      transition-duration: 75ms;
    }
  }

  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.primary8};
    border-radius: inherit;
    transform: translateZ(-1px);
    transition: transform 300ms cubic-bezier(0, 0, 0.58, 1), box-shadow 300ms cubic-bezier(0, 0, 0.58, 1);
    box-sizing: border-box;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary10}, 0 0 ${({ theme }) => theme.colors.primary4};
  }
`

const Circle = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
  display: flex;
  align-content: center;
  justify-content: center;

  text {
    font-family: 'Helvetica Neue', Arial;
    font-size: 24px;
    font-weight: bold;
    color: black;
  }

  svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    animation-name: ${rotate};
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`
