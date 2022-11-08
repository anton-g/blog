import fs from 'fs'
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { join } from 'path'
import styled from 'styled-components'
import { Nav } from '../../components/Nav'
import PageTitle from '../../components/PageTitle'
import { generateMainFeeds } from '../../lib/feeds'
import { getAllPublicPosts, getPost, PostFrontmatter } from '../../lib/mdx'
// import { generateMainFeeds } from '../../lib/feeds'

type PostsProps = {
  posts: {
    frontmatter: PostFrontmatter
    slug: string
  }[]
}

const Posts: NextPage<PostsProps> = ({ posts }) => {
  return (
    <Wrapper>
      <Nav />
      <Content>
        <PageTitle>Posts</PageTitle>
        <Columns>
          {posts
            .sort(
              (a, b) =>
                new Date(b.frontmatter.date).getTime() -
                new Date(a.frontmatter.date).getTime()
            )
            .map((post: any) => (
              <PostLink key={post.slug} href={'/posts/' + post.slug}>
                {post.frontmatter.title}
              </PostLink>
            ))}
        </Columns>
      </Content>
    </Wrapper>
  )
}

const postsDirectory = join(process.cwd(), 'content')

export const getStaticProps: GetStaticProps = async ({ params }) => {
  generateMainFeeds()

  const publicPosts = await getAllPublicPosts()

  return {
    props: {
      posts: publicPosts,
    },
  }
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

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem 4rem;
  padding: 24px;

  @media (max-width: 660px) {
    grid-template-columns: 1fr;
  }
`

const PostLink = styled(Link)`
  font-family: var(--font-yeseva);
  font-size: 36px;

  &:nth-child(2n + 1) {
    text-align: right;
  }

  &:hover {
    text-decoration: underline var(--color-primary11) wavy;
    text-decoration-skip-ink: none;
  }

  @media (max-width: 660px) {
    grid-template-columns: 1fr;

    text-align: center;
    &:nth-child(2n + 1) {
      text-align: center;
    }
  }
`

export default Posts
