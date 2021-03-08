import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 18px -2.5rem 18px -2.5rem;
  padding: 20px 32px;
  border: 1px solid #059669;
  border-radius: 4px;
  font-size: 14px;

  @media screen and (max-width: 849px) {
    margin-left: 0;
    margin-right: 0;
  }

  p {
    margin-top: 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .gatsby-highlight {
    margin: 0;
  }
`

const Icon = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  margin-left: -42px;
  border-radius: 50%;
  background-color: var(--color-background);
  padding: 2px 0;
  color: #10b981;

  path {
    opacity: 0.8;
  }
`

export function Callout({ children }) {
  return (
    <Wrapper>
      <Icon xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
      </Icon>
      {children}
    </Wrapper>
  )
}
