import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'

export function Extracurricular({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <Wrapper open={open}>
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

const Wrapper = styled.aside<{ open: boolean }>`
  margin: 32px;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  opacity: ${({ open }) => (open ? 1 : 0.75)};

  &:hover {
    opacity: 1;
  }
  @media screen and (max-width: 849px) {
    margin-left: 0;
    margin-right: 0;
  }
  p {
    margin-top: 0 code {
      font-size: inherit;
    }

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
  padding: 8px 40px;
  color: black;
  cursor: pointer;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  line-height: inherit;
`

const Chevron = styled.svg<{ open: boolean }>`
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;

  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
`

const Content = styled.div<{ open: boolean }>`
  padding: 0 40px 10px 40px;
  display: ${({ open }) => (open ? 'block' : 'none')};
`
