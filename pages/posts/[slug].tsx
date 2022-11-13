import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import fs from 'fs'
import { ParsedUrlQuery } from 'querystring'
import Image from 'next/image'
import styled from 'styled-components'
import { Nav } from '../../components/Nav'
import { join } from 'path'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import { Code } from '../../components/Code'
import { getPost, Post } from '../../lib/mdx'
import Head from 'next/head'
import ConfettiCanon from '../../components/ConfettiCanon'
import { useRouter } from 'next/router'
import { Spacer } from '../../components/Spacer'
import Confettis from '../../components/Confettis'

if (process.platform === 'win32') {
  process.env.ESBUILD_BINARY_PATH = join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'esbuild.exe'
  )
} else {
  process.env.ESBUILD_BINARY_PATH = join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'bin',
    'esbuild'
  )
}

const ResponsiveImage = (props: any) => (
  <Image
    {...props}
    alt={props.alt}
    sizes="100vw"
    width={1}
    height={1}
    style={{
      display: 'block',
      width: '100%',
      height: 'auto',
      margin: '0 auto',
    }}
  />
)

const components = {
  pre: Code,
  img: ResponsiveImage,
}

const PostPage: NextPage<{ result: Post }> = ({ result }) => {
  const Component = useMemo(() => getMDXComponent(result.code), [result.code])

  const router = useRouter()

  const encodedTitle = encodeURI('"' + result.frontmatter.title + '"')
  const url = `https://antongunnarsson.com/${router.asPath}`
  const shareLink = `https://twitter.com/share?url=${url}&text=${encodedTitle}%20by%20Anton%20Gunnarsson.&via=Awnton`

  return (
    <div>
      <Head>
        <title>{result.frontmatter.title}</title>
        <meta
          name="description"
          content={`${result.frontmatter.description}, written by Anton Gunnarsson`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Wrapper>
        <Title>{result.frontmatter.title}</Title>
        <Content>
          <Component components={components} />
        </Content>
        <Spacer size={96} />
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="3px"
          height="3px"
          viewBox="0 0 6 6"
          xmlSpace="preserve"
          overflow="visible"
        >
          <circle fill="black" r="6" cx="3" cy="3"></circle>
        </svg>
        <Spacer size={96} />
        <Footer>
          <ConfettiWrapper>
            <ConfettiCanon></ConfettiCanon>
            <Arrow>
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </Arrow>
            <p>
              Enjoyed the post? <br />
              Celebrate with <Confettis>confetti</Confettis>!
            </p>
          </ConfettiWrapper>
          <TwitterWrapper>
            <p>Share this post on Twitter!</p>
            <Arrow>
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Arrow>
            <a href={shareLink} target="_blank" rel="noopener noreferrer">
              <Image
                width={100}
                height={100}
                src={'/twitter.png'}
                alt="twitter logo"
              />
            </a>
          </TwitterWrapper>
        </Footer>
      </Wrapper>
    </div>
  )
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

const postsDirectory = join(process.cwd(), 'content')

export const getStaticProps: GetStaticProps<{}, IParams> = async ({
  params,
}) => {
  if (!params) throw Error('wtf')

  const result = await getPost(params.slug)

  if (result.errors.length > 0) {
    throw Error('wtf')
  }

  return {
    props: { result },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(postsDirectory)
  const posts = await Promise.all(
    files.map(async (fileName) => {
      const slug = fileName.replace('.mdx', '')
      const mdx = await getPost(slug)

      return {
        frontmatter: mdx.frontmatter,
        slug,
      }
    })
  )
  const publicPosts = posts.filter((x) => !x.frontmatter.unlisted)

  return {
    paths: publicPosts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export default PostPage

const Wrapper = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;

  @media screen and (max-width: 420px) {
    padding: 16px;
  }
`

const Title = styled.h1`
  font-family: var(--font-yeseva);
  max-width: 1000px;
  font-size: clamp(46px, 6vw + 1rem, 96px);
  text-align: center;
  font-weight: normal;
  line-height: 1;
  margin-top: clamp(66px, 10vw + 1rem, 96px);
`

const Content = styled.div`
  max-width: 660px;
  width: 100%;
  code {
    background-color: var(--color-gray2);
    font-family: var(--font-share-tech), monospace;
  }
  a {
    color: var(--color-primary11);
    &:focus,
    &:hover {
      text-decoration: underline var(--color-primary11) wavy;
      text-decoration-skip-ink: none;
    }
  }
  h2 {
    margin-top: 48px;
  }
`

const Footer = styled.div`
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 64px;
  width: 100%;
  gap: 12px 0;
`

const Arrow = styled.div`
  width: 20px;
  height: 20px;
`

const TwitterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;

  img {
    transition: transform 0.3s;
  }

  a:hover img {
    transform: scale(1.2) rotateZ(-10deg);
  }

  p {
    max-width: 150px;
    text-align: right;
  }

  ${Arrow} {
    margin-left: 20px;
  }
`

const ConfettiWrapper = styled.div`
  display: flex;
  align-items: center;

  ${Arrow} {
    margin-right: 20px;
  }
`
