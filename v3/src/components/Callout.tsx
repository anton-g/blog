import { ReactNode } from 'react'
import styled from 'styled-components'

export function Callout({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary2};
  padding: 16px 32px;
  color: ${({ theme }) => theme.colors.primary12};

  > p {
    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`
