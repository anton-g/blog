import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts } from '../../api'

type PostsProps = {
  posts: any[]
}

const Posts: NextPage<PostsProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <p key={post.slug}>
          <Link href={'/posts/' + post.slug} passHref>
            <a>
              {post.frontmatter.date} - {post.frontmatter.title}
            </a>
          </Link>
        </p>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getAllPosts()

  console.log(posts)

  return {
    props: {
      posts: posts,
    },
  }
}

export default Posts
