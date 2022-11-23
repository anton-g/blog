import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import fs from 'fs'
import { ParsedUrlQuery } from 'querystring'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import { Nav } from '../../components/Nav'
import { join } from 'path'
import { getMDXComponent } from 'mdx-bundler/client'
import { forwardRef, ReactNode, useMemo, useState } from 'react'
import { Code } from '../../components/Code'
import { getPost, Post } from '../../lib/mdx'
import Head from 'next/head'
import ConfettiCanon from '../../components/ConfettiCanon'
import { useRouter } from 'next/router'
import { Spacer } from '../../components/Spacer'
import Confettis from '../../components/Confettis'
import { motion, PanInfo } from 'framer-motion'
import useDimensions from '../../hooks/useDimensions'
import useSound from 'use-sound'
import { trackGoal } from 'fathom-client'
import { useSoundMode } from '../../contexts/SoundContext'
import * as Popover from '@radix-ui/react-popover'
import Link from 'next/link'

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
        <PostFooter post={result} />
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

const PostFooter = ({ post }: { post: Post }) => {
  const [birdFed, setBirdFed] = useState<number[]>([])
  const { soundMode } = useSoundMode()
  const [playEatingSound] = useSound('/sounds/eating.mp3', { volume: 0.5 })
  const [ref, feedDimensions] = useDimensions({ liveMeasure: true })
  const router = useRouter()

  const encodedTitle = encodeURI('"' + post.frontmatter.title + '"')
  const url = `https://antongunnarsson.com/${router.asPath}`
  const shareLink = `https://twitter.com/share?url=${url}&text=${encodedTitle}%20by%20Anton%20Gunnarsson.&via=Awnton`

  const onDragFeedEnd = (info: PanInfo, feedNo: number) => {
    if (!feedDimensions) return
    const { x, y } = info.point

    const targetMinX = feedDimensions.left + window.pageXOffset - 10
    const targetMaxX = feedDimensions.left + window.pageXOffset + 10
    const targetMinY = feedDimensions.top + window.pageYOffset - 10
    const targetMaxY = feedDimensions.top + window.pageYOffset + 10

    const matchingX = x > targetMinX && x < targetMaxX
    const matchingY = y > targetMinY && y < targetMaxY

    if (matchingX && matchingY) {
      setBirdFed([...birdFed, feedNo])
      soundMode && playEatingSound()
      trackGoal('8CF5F0FV', 0)
    }
  }

  return (
    <FooterWrapper>
      {post.frontmatter.state === 'budding' && (
        <PostStatePopover state={post.frontmatter.state}>
          {seed}
        </PostStatePopover>
      )}
      {post.frontmatter.state === 'growing' && (
        <PostStatePopover state={post.frontmatter.state}>
          {growing}
        </PostStatePopover>
      )}
      {post.frontmatter.state === 'bloomed' && (
        <PostStatePopover state={post.frontmatter.state}>
          <Bloomed birdFed={birdFed} onDragFeedEnd={onDragFeedEnd} />
        </PostStatePopover>
      )}
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
          <ShareLink href={shareLink} target="_blank" rel="noopener noreferrer">
            <FeedAnchor ref={ref} />
            <Bird fed={birdFed.length > 0} key={birdFed.length} />
          </ShareLink>
        </TwitterWrapper>
      </Footer>
    </FooterWrapper>
  )
}

const Footer = styled.div`
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 64px;
  width: 100%;
  gap: 12px 0;
`

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &:has(circle.dragged) ${Footer} {
    pointer-events: none;
    user-select: none;
  }
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

  svg {
    transition: transform 0.3s;
  }

  a:hover svg {
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

const ShareLink = styled.a`
  position: relative;
`

const FeedAnchor = styled.div`
  top: 5px;
  left: 65px;
  position: absolute;
  width: 1px;
  height: 1px;
`

const Bird = ({ fed }: { fed: boolean }) => {
  return (
    <svg
      width="80"
      height="50"
      viewBox="0 0 247 201"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        animate={fed ? 'eat' : undefined}
        variants={birdVariants}
        d="M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 229.43 9.53262 239.35 3.65262C235.58 15.3426 227.69 25.2726 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z"
        fill="#1D9BF0"
      />
    </svg>
  )
}

const birdVariants = {
  eat: {
    d: [
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 229.43 9.53262 239.35 3.65262C235.58 15.3426 227.69 25.2726 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // open
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 236 15.9126 246.15 23.6326C237.5 28 230 30.0678 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // closed
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C219.5 15.9126 235 15.9126 246.15 19C233 23.6326 226 25 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // half
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 236 15.9126 246.15 23.6326C237.5 28 230 30.0678 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // closed
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 229.43 9.53262 239.35 3.65262C235.58 15.3426 227.69 25.2726 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // open
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 236 15.9126 246.15 23.6326C237.5 28 230 30.0678 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // closed
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C219.5 15.9126 235 15.9126 246.15 19C233 23.6326 226 25 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // half
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 236 15.9126 246.15 23.6326C237.5 28 230 30.0678 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // closed
      'M220.95 49.7926C221.1 51.9626 221.1 54.1326 221.1 56.3226C221.1 123.053 170.3 200.013 77.41 200.013V199.973C49.97 200.013 23.1 192.153 0 177.333C3.99 177.813 8 178.053 12.02 178.063C34.76 178.083 56.85 170.453 74.74 156.403C53.13 155.993 34.18 141.903 27.56 121.333C35.13 122.793 42.93 122.493 50.36 120.463C26.8 115.703 9.85 95.0026 9.85 70.9626V70.3226C16.87 74.2326 24.73 76.4026 32.77 76.6426C10.58 61.8126 3.74 32.2926 17.14 9.21262C42.78 40.7626 80.61 59.9426 121.22 61.9726C117.15 44.4326 122.71 26.0526 135.83 13.7226C156.17 -5.39738 188.16 -4.41738 207.28 15.9126C218.59 13.6826 229.43 9.53262 239.35 3.65262C235.58 15.3426 227.69 25.2726 217.15 31.5826C227.16 30.4026 236.94 27.7226 246.15 23.6326C239.37 33.7926 230.83 42.6426 220.95 49.7926Z', // open
    ],
    transition: {
      ease: 'easeInOut',
      duration: 2,
      times: [0, 1],
      delay: 0.2,
    },
  },
}

const seed = (
  <svg
    width="53"
    height="50"
    viewBox="0 0 53 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.77312 39.6093C9.47195 35.526 15.789 36.873 20.6084 36.2683C24.6724 35.7584 27.3217 34.9601 31.1286 36.2683L31.2238 36.301C35.0543 37.6171 39.5322 39.1557 38.7266 42.5791C38.1168 45.1701 35.3493 45.6778 32.5898 46.91C25.5015 50.0751 17.3917 50.6698 12.1337 45.5489C10.1409 43.6079 8.33747 42.1548 8.77312 39.6093Z"
      fill="#CFCFCF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 3.97606C15.1892 -6.13963 23.2204 5.42739 24.6717 12.3209C24.6717 12.3209 25.4278 12.2712 25.9416 11.5953C30.2954 4.15751 37.5468 1.85108 44.9896 5.97156C46.078 5.79012 53.5158 13.9536 52.9716 14.3164C52.795 14.4341 52.4658 14.3418 51.9839 14.2068C51.803 14.1561 51.6005 14.0993 51.3766 14.0454C44.2277 8.86746 41.4971 7.26246 34.6498 8.16345C34.123 8.35092 34.202 8.41848 34.4684 8.52627C41.1544 7.99839 44.2567 9.51854 50.728 13.9144C49.7685 13.761 48.5208 13.7506 46.9851 14.3164C46.6303 14.4471 46.3044 14.5739 45.9981 14.6932L45.998 14.6932C43.3274 15.7326 42.1405 16.1946 36.2819 13.5908C29.7512 10.6882 25.2159 13.5908 25.2159 13.5908C23.5498 24.7923 23.6951 30.9801 25.3973 41.8906C23.8835 42.4559 22.9815 42.6583 20.8621 41.8906C20.796 30.0949 21.4569 23.8677 24.1275 13.5908C24.1275 13.5908 21.5877 11.5953 17.5967 12.1395C13.6057 12.6837 6.16792 11.5953 4.35383 8.5113C4.12094 8.11539 3.90828 7.745 3.71036 7.40029L3.71035 7.40027C2.81995 5.84946 2.2279 4.81829 1.4345 4.32029C6.1239 2.44593 8.7092 2.40313 12.6985 4.89794C12.9406 4.75795 13.0442 4.66964 12.6985 4.35371C8.39654 1.97709 5.79299 2.17285 1.03227 4.12079C0.729277 4.00764 0.392187 3.9592 0 3.97606Z"
      fill="black"
    />
  </svg>
)

const growing = (
  <svg
    width="66"
    height="136"
    viewBox="0 0 66 136"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.11327 119.055C1.31999 111.947 12.2281 114.292 20.5501 113.239C27.5678 112.352 32.1425 110.962 38.7161 113.239L38.8804 113.296C45.4949 115.587 53.2272 118.266 51.8361 124.225C50.7832 128.735 46.0043 129.619 41.2392 131.764C28.9994 137.274 14.9956 138.309 5.91632 129.395C2.4751 126.016 -0.638987 123.486 0.11327 119.055Z"
      fill="#CFCFCF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28.0088 46.0313C23.4141 76.8644 20.9692 93.5539 20.5088 124.031C21.9847 125.591 23.5638 126.182 26.0088 125.031C22.9999 97.5 29.21 51.6709 31.0088 50.5313C32.8076 49.3917 35.5 49 44.5 54C45.8195 54.7331 46.1821 56.1861 46.5455 57.6427C46.9434 59.2377 47.3424 60.837 49 61.5C51.5 62.5 63.5 64.5 65 62C65.2892 61.518 64.6249 59.8481 63.9792 58.2251L63.9791 58.225C63.8799 57.9757 63.7812 57.7274 63.6864 57.4848C57.2698 59.9232 54.5042 59.3331 51.4125 55.0007C50.8823 54.2314 50.8433 53.9848 51.4125 54.0007C54.921 58.402 57.6345 59.1145 63.2395 56.3074C62.3156 53.8519 61.6808 52.2411 60 50C58.2806 47.7074 54.9187 48.207 51.1381 48.7689C48.3224 49.1873 45.2746 49.6403 42.5 49C41.814 48.8417 41.3149 48.6297 41 48C40.8371 47.6741 41.9313 47.4277 43.5554 47.062C46.9153 46.3055 52.5431 45.0382 54 41.5C55.5601 37.7111 57.8157 35.4124 59.7481 33.8511C50.1582 36.459 46.8929 39.0615 43.5973 44C43.0436 44.1967 42.8696 44.1546 43.0973 43.5C46.4256 38.1837 50.3329 35.6016 61.9954 32.1756C63.1791 31.314 63.8611 30.7222 63.5 30C63 29 56.4992 27.9809 52 28.5C42.0249 29.651 40.9678 32.3435 39.3684 36.4173C38.8834 37.6527 38.3486 39.0151 37.5 40.5C33.5 47.5 32 47 31.5 46.5C30.9538 45.9538 31.3468 44.3525 31.7932 42.5338C32.1641 41.0228 32.5717 39.3619 32.5082 38.0313C32.3717 35.172 33.5314 32.7328 34.6342 30.4133C36.3899 26.7204 38.0015 23.3307 34.0092 19.0313C29.7009 14.3915 27.1498 7.55507 25.9194 3.47238C24.5152 6.22733 22.3188 11.3044 23.0002 15C23.3992 17.1636 24.7599 18.7335 26.0848 20.262C27.5648 21.9696 29.0001 23.6256 29.0001 26C29.0001 26.4366 28.0483 26.4339 28.0001 26C27.7535 23.7803 26.3612 22.2978 24.9186 20.7617C23.4365 19.1836 21.9013 17.5488 21.5002 15C20.7829 10.4411 24.1246 4.16823 25.4647 1.88028C25.1541 0.726639 25.0092 0.0312453 25.0092 0.0312453C25.0092 0.0312453 20.5092 -0.468725 18.5092 2.53128C17.5638 3.94941 17.5122 5.14409 17.4565 6.43221C17.3945 7.86904 17.3274 9.42213 16.0092 11.5313C15.3022 12.6625 14.6351 13.3939 14.0646 14.0194C12.6179 15.6055 11.792 16.511 12.5092 21.5313C13.1088 25.7282 18.7405 29.5656 23.3703 32.7203C26.4625 34.8273 29.1078 36.6297 29.5082 38.0313C29.8301 39.1578 30.0322 39.9834 29.5082 41.0313C29.3775 41.2927 28.7346 40.9734 27.6954 40.4573C24.7585 38.9988 18.6569 35.9688 12.0092 40.0313C9.81451 41.3725 6.62221 42.1853 4.08051 42.8325C1.67632 43.4446 -0.145754 43.9086 0.00919363 44.5313C0.100532 44.8983 0.259553 44.9286 0.597301 44.9929C0.864653 45.0438 1.24399 45.116 1.7904 45.3934C3.00601 44.9602 7.79585 43.3826 11.5001 44C14.5001 44.5 20.0001 41 20.0001 41C20.6385 40.8652 20.7131 41.0005 20.5001 41.5C20.5001 41.5 15.0001 45 11.5001 44.5C8.00214 44.0003 3.89566 45.3115 2.49603 45.8137C3.03887 46.181 3.70069 46.7227 4.50919 47.5313C10.8603 53.8827 28.0088 46.0313 28.0088 46.0313Z"
      fill="black"
    />
  </svg>
)

const Bloomed = forwardRef<
  any,
  {
    birdFed: number[]
    onDragFeedEnd: (info: PanInfo, feedNo: number) => void
  }
>(({ onDragFeedEnd, birdFed }, ref) => {
  const [draggedClass, setDraggedClass] = useState('')

  const handleDragEnd = (info: PanInfo, feedNo: number) => {
    setDraggedClass('')
    onDragFeedEnd(info, feedNo)
  }

  return (
    <div ref={ref}>
      <svg
        width="128"
        height="196"
        viewBox="0 0 128 196"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <path
          d="M28.1547 172.701C29.8023 162.928 44.6961 166.152 56.0588 164.704C65.6406 163.484 71.8868 161.573 80.8624 164.704L81.0868 164.783C90.1181 167.933 100.676 171.615 98.7762 179.809C97.3386 186.011 90.8136 187.226 84.3074 190.176C67.5953 197.751 48.4748 199.175 36.078 186.918C31.3795 182.272 27.1275 178.794 28.1547 172.701Z"
          fill="#CFCFCF"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M62.9381 179.031C64.1728 182.323 68.7 182.323 70.3462 179.031C69.2217 160.017 68.8788 149.672 69.1115 132.112C69.5463 130.619 72.5324 130.534 76.4707 130.423C83.6639 130.219 94.0337 129.925 97.8374 120.793C92.0001 119.565 88.6883 119.977 83.5478 122.646C82.9879 122.511 82.9109 122.354 83.5478 121.823C88.5243 119.315 91.844 118.935 98.1829 120.068C98.4631 119.67 98.8996 119.276 99.3141 118.902C99.9913 118.292 100.61 117.734 100.39 117.296C99.9789 116.473 81.87 111.122 69.1115 129.231L68.7313 111.122C88.3724 113.625 94.4895 112.371 104.537 108.241C113.278 103.622 118.351 99.0147 123.165 90.3587C109.062 89.3783 102.115 91.3625 93.4247 99.187C91.9128 99.4363 91.2141 99.426 92.6015 96.7176C101.851 89.5087 108.667 86.9752 124.421 87.9982C125.594 85.7005 126.769 83.1393 127.997 80.2551C94.1812 74.5922 79.432 86.4286 73.6701 104.537C72.4354 109.065 68.7313 108.241 68.7313 108.241C68.4398 96.8657 68.6826 88.5191 68.9663 78.766L68.9664 78.7618L68.9667 78.7548L68.967 78.7428C69.0148 77.099 69.0638 75.4152 69.1115 73.6701C69.1115 73.6701 88.8674 78.1973 97.9211 67.9081C105.35 59.4651 112.737 43.2143 112.737 43.2143C112.737 43.2143 111.575 43.1416 109.697 43.1256C109.338 43.5652 108.994 43.9865 108.664 44.3909C101.987 52.5737 100.976 53.813 90.9558 59.6769C89.4695 59.9819 88.8508 59.9864 89.7211 58.4422C100.702 52.202 101.735 50.8869 107.341 43.7535L107.831 43.1298C101.432 43.2126 90.389 44.0546 84.751 48.5646C77.2623 54.555 69.1115 67.4966 69.1115 67.4966C69.1115 67.4966 69.5926 50.9303 69.1115 40.3333C69.0003 37.8819 69.0404 35.7248 69.0781 33.6944C69.1644 29.0543 69.2384 25.0754 67.4653 19.7551C62.9388 6.17347 44.4177 0 44.4177 0C44.4177 0 44.396 0.114651 44.3578 0.330144C53.1622 9.43138 56.3458 15.1224 59.2653 25.9286C58.9687 27.1964 58.6084 27.4128 57.619 26.7517C55.0212 15.8934 51.4332 10.6858 43.9509 2.85016C42.9888 9.33744 41.2555 25.0307 46.0639 30.0442C49.476 33.6017 55.439 35.3547 60.0707 36.7162C63.7435 37.7959 66.5793 38.6296 66.6422 39.9218C66.8322 53.7207 66.6117 61.9776 65.819 77.3741C65.819 77.3741 64.9959 52.2687 44.0061 45.2721C31.6554 41.1552 9.02386 44.0374 10.6694 45.2721C12.0704 46.3234 13.8878 46.539 15.5191 46.7326C16.681 46.8705 17.7486 46.9972 18.5043 47.4066C35.2576 48.2507 42.6614 50.466 50.2109 58.0306C51.1537 59.1004 50.8041 59.233 49.7993 59.2653C41.5933 51.5993 34.5734 49.2247 19.5806 48.6479C19.8173 49.1129 20.124 49.7667 20.4975 50.5626L20.4975 50.5627C22.5914 55.0253 26.7823 63.9571 32.4823 69.1428C42.7107 78.4484 50.871 80.1757 65.819 81.0782C65.5878 91.6484 65.4175 97.9402 64.9959 110.299C64.2871 109.076 63.6155 107.899 62.967 106.762L62.9669 106.762C57.7973 97.6995 54.1 91.218 44.8292 84.7823C30.4325 74.788 -5.79247 74.0816 0.791828 76.1394C1.02073 76.211 1.26222 76.3733 1.51718 76.6167C23.5872 81.7543 32.2352 85.4035 41.9796 93.0136C42.7162 94.3404 42.4265 94.5205 41.1565 94.2483C32.6516 87.1125 23.5758 83.5763 2.72142 78.1693C3.70444 79.6944 4.85008 81.9579 6.19059 84.6064C10.0572 92.2459 15.545 103.089 23.4279 108.653C30.4245 113.592 46.1449 114.668 64.9959 113.18C63.7381 135.013 63.4813 149.147 63.0116 174.993V174.993L62.9381 179.031Z"
          fill="black"
        />
        <motion.circle
          drag
          dragSnapToOrigin
          onDrag={() => setDraggedClass('dragged')}
          onDragEnd={(e, info) => handleDragEnd(info, 1)}
          className={draggedClass}
          cx="71.5"
          cy="40.5"
          r="4.5"
          fill={birdFed.includes(1) ? 'transparent' : 'hsl(336,75.0%,47.2%)'}
        />
        <motion.circle
          drag
          dragSnapToOrigin
          onDrag={() => setDraggedClass('dragged')}
          onDragEnd={(e, info) => handleDragEnd(info, 2)}
          className={draggedClass}
          cx="57.5"
          cy="80.5"
          r="4.5"
          fill={birdFed.includes(2) ? 'transparent' : 'hsl(336,75.0%,47.2%)'}
        />
        <motion.circle
          drag
          dragSnapToOrigin
          onDrag={() => setDraggedClass('dragged')}
          onDragEnd={(e, info) => handleDragEnd(info, 3)}
          className={draggedClass}
          cx="71.5"
          cy="114.5"
          r="4.5"
          fill={birdFed.includes(3) ? 'transparent' : 'hsl(336,75.0%,47.2%)'}
        />
      </svg>
    </div>
  )
})
Bloomed.displayName = 'Bloomed'

const PostStatePopover = ({
  children,
  state,
}: {
  children: ReactNode
  state: 'budding' | 'growing' | 'bloomed'
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          sideOffset={8}
        >
          <Link href="/posts/digital-garden">
            {state === 'budding' && 'This post has just budded!'}
            {state === 'growing' && 'This post is still growing.'}
            {state === 'bloomed' && 'This post has bloomed!'}
            <br />
            Read more about <strong>Digital Gardens</strong>.
          </Link>
          <Popover.Arrow />
        </PopoverContent>
      </Popover.Portal>
    </Popover.Root>
  )
}

const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const PopoverContent = styled(Popover.Content)`
  border: 2px dashed var(--color-gray10);
  border-radius: 6px;
  padding: 8px;
  animation: ${appear} 500ms;

  a {
    strong {
      font-weight: normal;
      color: var(--color-primary11);
    }

    &:hover strong {
      text-decoration: underline var(--color-primary11) wavy;
      text-decoration-skip-ink: none;
    }
  }

  svg {
    fill: var(--color-gray10);
  }
`
