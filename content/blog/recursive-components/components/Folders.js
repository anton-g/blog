import React from 'react'
import Folder from './Folder'

function Folders() {
  return (
    <ul
      style={{
        margin: '4px 10px',
        boxSizing: 'border-box',
        listStyle: 'none',
        paddingLeft: '20px',
        border: 'none',
        marginBottom: '2rem',
      }}
    >
      <Folder folder={data}></Folder>
    </ul>
  )
}

export default Folders

const data = {
  name: 'Desktop folder',
  children: [
    {
      name: 'Pics',
      children: [
        {
          name: 'Cats',
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
