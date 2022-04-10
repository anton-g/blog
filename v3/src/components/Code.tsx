import styled from 'styled-components'

type Props = React.HTMLProps<HTMLPreElement>

export const Code = ({ children }: Props) => {
  return <Pre>{children}</Pre>
}

const Pre = styled.pre`
  background-color: ${({ theme }) => theme.colors.gray2};
  margin: 0 -56px;
  border-radius: 8px;
  font-size: 16px;
  max-width: calc(100% + 112px);

  @media screen and (max-width: 772px) {
    border-radius: 0;
  }

  @media screen and (max-width: 692px) {
    margin: 0 -32px;
  }

  @media screen and (max-width: 420px) {
    margin: 0 -16px;
  }

  > code {
    font-family: 'Share Tech Mono', monospace;
    display: grid;
    line-height: 1.4;
    padding: 16px;
    overflow-x: scroll;
  }
`
