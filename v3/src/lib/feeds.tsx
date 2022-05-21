import { Feed, Item } from 'feed'
import fs from 'fs'
import { MDXRemote } from 'next-mdx-remote'
import * as ReactDOMServer from 'react-dom/server'
import { ThemeProvider } from 'styled-components'
import { components } from '../pages/posts/[slug]'
import { lightTheme } from '../styles/theme'
import { parseISO } from 'date-fns'
import { getAllPublicPosts, Post } from '../api'

const buildFeed = (): Feed => {
  return new Feed({
    title: 'Anton Gunnarsson',
    description: 'A feed of all the posts on Anton Gunnarssons home on the world wide web',
    id: 'https://antongunnarsson.com',
    link: 'https://antongunnarsson.com',
    language: 'en',
    image: undefined,
    favicon: undefined,
    copyright: 'Anton Gunnarsson',
    generator: 'NextJS + feed package',
    feedLinks: {
      json: 'https://antongunnarsson.com/feeds/feed.json',
      atom: 'https://antongunnarsson.com/feeds/atom.xml',
      rss2: 'https://antongunnarsson.com/feeds/feed.xml',
    },
    author: {
      name: 'Anton Gunnarsson',
      email: 'https://twitter.com/awnton',
      link: 'https://antongunnarsson.com',
    },
  })
}

const makeItem = (post: Post): Item => {
  const baseUrl = `https://antongunnarsson.com`
  const url = `${baseUrl}/posts/${post.slug}`
  const htmlContent = ReactDOMServer.renderToStaticMarkup(
    <ThemeProvider theme={lightTheme}>
      <MDXRemote {...post} components={components} />
    </ThemeProvider>
  )
    .replace(/href="\/#/g, `href="${url}#`)
    .replace(/href="\//g, `href="${baseUrl}/`)
    .replace(/src="\//g, `src="${baseUrl}/`)

  return {
    title: post.frontmatter.title || 'Missing title',
    link: url,
    id: url,
    date: post.frontmatter.date ? parseISO(post.frontmatter.date) : new Date(),
    description: post.frontmatter.description,
    content: htmlContent,
  }
}

export const generateMainFeeds = async () => {
  const feed = buildFeed()

  const posts = await getAllPublicPosts(['slug', 'date', 'title', 'unlisted', 'content'])

  posts.forEach((post) => feed.addItem(makeItem(post)))
  fs.mkdirSync('public/feeds/', { recursive: true })
  fs.writeFileSync('public/feeds/feed.xml', feed.rss2())
  fs.writeFileSync('public/feeds/feed.json', feed.json1())
  fs.writeFileSync('public/feeds/atom.xml', feed.atom1())
}
