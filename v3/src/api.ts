import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

const postsDirectory = join(process.cwd(), 'src/content')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Record<string, any> = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach(async (field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = await serialize(content)
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  console.log(items)
  return items
}

export async function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = (await Promise.all(slugs.map((slug) => getPostBySlug(slug, fields)))).sort((post1, post2) =>
    post1.date > post2.date ? -1 : 1
  )
  return posts
}
