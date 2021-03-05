import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 18px -2.5rem 18px -2.5rem;
  padding: 20px 32px;
  border: 1px solid #f9a8d4;
  border-radius: 4px;
  font-size: 14px;

  @media screen and (max-width: 849px) {
    margin-left: 0;
    margin-right: 0;
  }
`

const Icon = styled.svg`
  width: 24px;
  height: 24px;
  position: absolute;
  margin-left: -44px;
  border-radius: 50%;
  background-color: var(--color-background);
  padding: 4px 0;

  path {
    opacity: 0.8;
  }
`

export function Callout({ children }) {
  return (
    <Wrapper>
      <Icon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </Icon>
      {children}
    </Wrapper>
  )
}
