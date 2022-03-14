import { styled } from '@stitches/react'
import React from 'react'
import { Folder } from './Folder'

export function Folders() {
  return (
    <List>
      <Folder folder={data}></Folder>
    </List>
  )
}

export type FolderType = {
  name: string
  children?: FolderType[]
}

const data: FolderType = {
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

const List = styled('ul', {
  margin: '4px 10px',
  boxSizing: 'border-box',
  listStyle: 'none',
  paddingLeft: '20px',
  border: 'none',
  marginBottom: '2rem',
})
