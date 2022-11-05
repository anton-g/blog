import type { NextPage } from 'next'
import Link from 'next/link'
import styled from 'styled-components'
import { Nav } from '../components/Nav'
import PageTitle from '../components/PageTitle'

const Appearances: NextPage = () => {
  return (
    <Wrapper>
      <Nav />
      <Content>
        <PageTitle>Appearances</PageTitle>
        <List>
          <Item>
            <AppearanceLink href="https://www.youtube.com/watch?v=uo3px1L3H70">
              <span>talk</span>
              <h2>CSS *is* awesome</h2>
              <span>Nordic.js 2022</span>
            </AppearanceLink>
          </Item>
          <Item>
            <AppearanceLink href="https://www.youtube.com/watch?v=GYSD0JudjwI&t=125s">
              <span>talk</span>
              <h2>Into the Visual World of State Machines</h2>
              <span>sthlm.js #71</span>
            </AppearanceLink>
          </Item>
          <Item>
            <AppearanceLink href="https://youtu.be/q7bAYxZMJho?t=3586">
              <span>talk</span>
              <h2>It&apos;s always better when we&apos;re together</h2>
              <span>sthlm.js #66</span>
            </AppearanceLink>
          </Item>
          <Item>
            <AppearanceLink href="https://kodsnack.se/409/">
              <span>podcast 🇸🇪</span>
              <h2>Komplex och komplicerad</h2>
              <span>Kodsnack #409</span>
            </AppearanceLink>
          </Item>
          <Item>
            <AppearanceLink href="https://kodsnack.se/393/">
              <span>podcast 🇸🇪</span>
              <h2>Alla driver bolag tillsammans</h2>
              <span>Kodsnack #393</span>
            </AppearanceLink>
          </Item>
          <Item>
            <AppearanceLink href="https://kodsnack.se/194/">
              <span>podcast 🇸🇪</span>
              <h2>Alla har en koppling till Söderhamn</h2>
              <span>Kodsnack #194</span>
            </AppearanceLink>
          </Item>
        </List>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-bottom: 36px;
`

const Content = styled.div`
  max-width: 1000px;
  margin: 96px auto;
  display: flex;
  gap: 64px;
  flex-direction: column;
  align-items: center;
`

const List = styled.ul`
  max-width: 600px;
  padding: 24px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 36px;
`

const Item = styled.li``

const AppearanceLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 2px;

  h2 {
    font-family: var(--font-yeseva);
    font-size: 36px;
    margin: 0;
  }

  &:hover h2 {
    text-decoration: underline var(--color-primary11) wavy;
    text-decoration-skip-ink: none;
  }

  span {
    color: var(--color-gray12);
  }
`

export default Appearances
