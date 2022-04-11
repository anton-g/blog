import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import styled from 'styled-components'
import { getAllPublicPosts } from '../../api'
import { Nav } from '../../components/Nav'

type PostsProps = {
  posts: any[]
}

const Posts: NextPage<PostsProps> = ({ posts }) => {
  return (
    <>
      <Nav />
      <Columns>
        {posts.map((post) => (
          <Link key={post.slug} href={'/posts/' + post.slug} passHref>
            <PostLink>{post.frontmatter.title}</PostLink>
          </Link>
        ))}
      </Columns>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getAllPublicPosts(['slug', 'date', 'title', 'unlisted'])

  return {
    props: {
      posts: posts,
    },
  }
}

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem 4rem;
  max-width: 1000px;
  margin: 96px auto;
`

const PostLink = styled.a`
  font-family: 'Yeseva One';
  font-size: 36px;

  &:nth-child(2n + 1) {
    text-align: right;
  }

  &:hover {
    text-decoration: underline ${({ theme }) => theme.colors.primary11} wavy;
    text-decoration-skip-ink: none;
  }
`

export default Posts
