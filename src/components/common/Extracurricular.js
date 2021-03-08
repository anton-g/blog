import React, { useState } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.section`
  margin: 32px -2.5rem 32px -2.5rem;
  border: 1px solid #059669;
  border-radius: 4px;
  font-size: 14px;
  position: relative;

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
`

const Title = styled.button`
  border: none;
  background: none;
  font-size: 14px;
  margin: 0;
  padding: 0;
  color: var(--color-text);
  cursor: pointer;
  padding: 8px 40px;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  line-height: inherit;
`

const Icon = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 6px;
  margin-left: -10px;
  border-radius: 50%;
  background-color: var(--color-background);
  padding: 2px 0;
  color: #10b981;

  path {
    opacity: 0.8;
  }
`

const Chevron = styled.svg`
  width: 20px;
  height: 20px;
  transform: rotate(${(p) => (p.open ? 180 : 0)}deg);
  transition: transform 0.2s ease;
`

const Content = styled.div`
  padding: 0 40px 10px 40px;
  ${(p) =>
    !p.open &&
    css`
      display: none;
    `}

  .gatsby-highlight {
    margin: 0;
  }
`

export function Extracurricular({ title, children }) {
  const [open, setOpen] = useState(false)

  return (
    <Wrapper>
      <Icon xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </Icon>
      <Title onClick={() => setOpen(!open)}>
        <span>
          <span style={{ fontWeight: 'bold' }}>Extracurricular: </span>
          {title}
        </span>
        <Chevron open={open} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </Chevron>
      </Title>
      <Content open={open}>{children}</Content>
    </Wrapper>
  )
}
