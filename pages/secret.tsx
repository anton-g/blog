import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import { Nav } from '../components/Nav'
import PageTitle from '../components/PageTitle'

const Secret: NextPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>🤫</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Nav />
      <Content>
        <PageTitle>hello :)</PageTitle>
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

export default Secret
