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
        <Link key={post.slug} href={'/posts/' + post.slug} passHref>
          <a>
            {post.date} - {post.title}
          </a>
        </Link>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = getAllPosts(['slug', 'title', 'date', 'description', 'state', 'unlisted'])

  return {
    props: {
      posts: posts,
    },
  }
}

// export const getStaticPaths: GetStaticPaths = () => {
//   const numPages = 1

//   return {
//     paths: [...Array(numPages)].map((v, i) => {
//       return {
//         params: { page: (i + 1).toString() },
//       }
//     }),
//     fallback: false,
//   }
// }

export default Posts
