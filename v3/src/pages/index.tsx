import { animated, config, useSpring } from '@react-spring/web'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'
import { Appearances } from '../components/Appearances'
import { BlogRoll } from '../components/BlogRoll'
import { FeaturedPosts } from '../components/FeaturedPosts'
import { Nav } from '../components/Nav'
import { Newsletter } from '../components/Newsletter'
import { Projects } from '../components/Projects'
import { ShopCTA } from '../components/ShopCTA'
import { Spacer } from '../components/Spacer'
import ReactCanvasConfetti from 'react-canvas-confetti'
import useDimensions from '../hooks/useDimensions'
import { MainHeading } from '../components/MainHeading'

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
      <Spacer size={140} />
      <ShopCTA open={isShopOpen} />
      <Spacer size={140} />
      <Newsletter />
      <Spacer size={196} />
      <BlogRoll />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.gray12};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`

export default Home
