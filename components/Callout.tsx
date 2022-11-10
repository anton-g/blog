import { ReactNode } from 'react'
import styled from 'styled-components'

export default function Callout({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  background-color: var(--color-primary3);
  padding: 16px 32px;
  color: var(--color-primary12);
  font-size: 16px;
  line-height: 1.5;

  > p {
    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`
