import styled from 'styled-components'
import { TwitterLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export const Nav = ({ hideLogo }: { hideLogo?: boolean }) => {
  return (
    <Wrapper>
      <Left>{!hideLogo && <Link href="/">ag</Link>}</Left>
      <Right>
        <a href="https://twitter.com/awnton">
          <TwitterLogoIcon height="24px" width="24px" />
        </a>
      </Right>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  width: 100%;
  display: flex;
  padding: 8px 12px;
`

const Left = styled.div`
  font-family: 'Yeseva One';
  display: flex;
  align-items: center;
  font-size: 20px;
`

const Right = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  line-height: 0;
`
