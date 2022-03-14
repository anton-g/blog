import { styled } from '@stitches/react'
import React, { ReactNode, useState } from 'react'

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

const Wrapper = styled('aside', {
  margin: '32px',
  border: '1px solid black',
  borderRadius: '4px',
  fontSize: '14px',
  position: 'relative',
  opacity: '0.75',

  '&:hover': {
    opacity: 1,
  },

  '@media screen and (max-width: 849px)': {
    marginLeft: 0,
    marginRight: 0,
  },

  p: {
    marginTop: 0,

    code: {
      fontSize: 'inherit',
    },

    '&:last-child': {
      marginBottom: 0,
    },
  },

  variants: {
    open: {
      false: {
        opacity: 0.75,
      },
      true: {
        opacity: 1,
      },
    },
  },
})

const Title = styled('button', {
  border: 'none',
  background: 'none',
  fontSize: '14px',
  margin: '0',
  padding: '8px 40px',
  color: 'black',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left',
  display: 'flex',
  justifyContent: 'space-between',
  lineHeight: 'inherit',
})

const Chevron = styled('svg', {
  width: '20px',
  height: '20px',
  transition: 'transform 0.2s ease',

  variants: {
    open: {
      true: { transform: 'rotate(180deg)' },
      false: { transform: 'rotate(0deg)' },
    },
  },
})

const Content = styled('div', {
  padding: '0 40px 10px 40px',

  variants: {
    open: {
      true: { display: 'block' },
      false: { display: 'none' },
    },
  },
})
