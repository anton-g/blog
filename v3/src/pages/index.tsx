import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import { Appearances } from '../components/Appearances'
import { FeaturedPosts } from '../components/FeaturedPosts'
import { Nav } from '../components/Nav'
import { Newsletter } from '../components/Newsletter'
import { Projects } from '../components/Projects'
import { Spacer } from '../components/Spacer'
import { MainHeading } from '../components/MainHeading'
import { BottomDrawer } from '../components/BottomDrawer'
import { CircleTextButton } from '../components/CircleTextButton'
import { EasterEgg } from '../components/EasterEgg'

type Props = {
  isShopOpen: boolean
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  return {
    props: {
      isShopOpen: new Date().getDay() === 5, // TODO timezone
    },
  }
}

const Home: NextPage<Props> = ({ isShopOpen }) => {
  return (
    <Wrapper>
      <Head>
        <title>anton gunnarsson</title>
        <meta name="description" content="anton gunnarsson" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav hideLogo />
      <MainHeading />
      <Spacer size={48} />
      <FeaturedPosts />
      <Spacer size={128} />
      <Projects />
      <Spacer size={128} />
      <Appearances />
      <Spacer size={128} />
      <CircleTextButton />
      {/* <Puzzle /> */}
      <Spacer size={128} />
      <Newsletter />
      <BottomDrawer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.colors.gray12};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  position: relative;
`

export default Home
