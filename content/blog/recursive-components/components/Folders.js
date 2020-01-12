import React from 'react'
import './Folders.css'
import Folder from './Folder'

function Folders() {
  return (
    <ul className="mdx" style={{ border: 'none', marginBottom: '2rem' }}>
      <Folder folder={data}></Folder>
    </ul>
  )
}

export default Folders

const data = {
  name: 'A folder with stuff',
  children: [
    {
      name: 'Important stuff',
      children: [
        {
          name: 'Memes',
        },
      ],
    },
    {
      name: 'Important stuff',
      children: [
        {
          name: 'Memes',
        },
        {
          name: 'Funny pics',
        },
      ],
    },
    {
      name: 'Blog post drafts',
    },
  ],
}
