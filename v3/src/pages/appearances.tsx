import type { NextPage } from 'next'
import styled from 'styled-components'
import { Nav } from '../components/Nav'
import { Spacer } from '../components/Spacer'

type Appearance = {
  title: string
  type: 'podcast' | 'talk'
  isInSwedish: boolean
  link: string
}
const data: Appearance[] = [
  {
    title: `Into the Visual World of State Machines`,
    type: 'talk',
    isInSwedish: false,
    link: '',
  },
  {
    title: `It's always better when we're together - Mob Programming`,
    type: 'talk',
    isInSwedish: false,
    link: 'https://www.youtube.com/watch?v=q7bAYxZMJho',
  },
  {
    title: 'Kodsnack 409: Komplex och komplicerad',
    type: 'podcast',
    isInSwedish: true,
    link: 'https://kodsnack.se/409/',
  },
  {
    title: 'Kodsnack 393: Alla driver bolag tillsammans',
    type: 'podcast',
    isInSwedish: true,
    link: 'https://kodsnack.se/393/',
  },
  {
    title: 'Kodsnack 194: Alla har en koppling till Söderhamn',
    type: 'podcast',
    isInSwedish: true,
    link: 'https://kodsnack.se/194/',
  },
]

const Appearances: NextPage = () => {
  return (
    <>
      <Nav />
      <Wrapper>
        <Spacer size={24} />
        <Title>appearances</Title>
        <Spacer size={48} />
        <AppearancesList>
          {data.map((a, i) => (
            <Appearance key={i}>
              <AppearanceLink href={a.link}>{a.title}</AppearanceLink>
              <Spacer size={58} />
              <AppearanceFlag>{a.isInSwedish && '🇸🇪'}</AppearanceFlag>
              <Spacer size={8} />
              <AppearanceType>{a.type}</AppearanceType>
            </Appearance>
          ))}
        </AppearancesList>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  font-size: 22px;
  font-family: var(--font-yeseva);
`

const AppearancesList = styled.ul`
  list-style: none;
  margin: 0;
`

const Appearance = styled.li`
  display: flex;
  margin-bottom: 36px;
`

const AppearanceLink = styled.a`
  font-family: var(--font-yeseva);
  font-size: 28px;
  cursor: pointer;
  max-width: 600px;
  width: 100%;

  &:hover {
    text-decoration: underline ${({ theme }) => theme.colors.primary11} wavy;
    text-decoration-skip-ink: none;
  }
`

const AppearanceFlag = styled.span`
  margin-left: auto;
`

const AppearanceType = styled.span`
  /* margin-left: auto; */
`

export default Appearances
