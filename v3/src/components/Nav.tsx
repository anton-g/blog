import styled from 'styled-components'
import { TwitterLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Spacer } from './Spacer'

export const Nav = ({ hideLogo }: { hideLogo?: boolean }) => {
  return (
    <Wrapper>
      <Left>{!hideLogo && <Link href="/">ag</Link>}</Left>
      <Right>
        <a href="/feeds/feed.xml">
          <svg
            height={24}
            width={24}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </a>
        <Spacer size={8} />
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
