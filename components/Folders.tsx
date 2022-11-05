import React, { useState } from 'react'
import styled from 'styled-components'

export default function Folders() {
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

const List = styled.ul`
  margin: 4px 10px;
  box-sizing: border-box;
  list-style: none;
  padding-left: 20px;
  border: none;
  margin-bottom: 2rem;
`

function Folder({ folder }: { folder: FolderType }) {
  const [open, setOpen] = useState(true)

  const hasChildren = !!folder.children

  return (
    <li style={{ marginTop: '4px' }}>
      {hasChildren && (
        <FolderButton
          open={open}
          onClick={() => setOpen((o) => !o)}
        ></FolderButton>
      )}
      <span
        className="mdx"
        style={{ paddingLeft: !hasChildren ? '0px' : '6px' }}
      >
        {folder.name}
      </span>
      {open && hasChildren ? (
        <ul
          style={{
            margin: '4px 10px',
            boxSizing: 'border-box',
            listStyle: 'none',
            paddingLeft: '20px',
            borderLeft: '1px dashed lightgray',
          }}
        >
          {folder.children?.map((x) => (
            <Folder key={x.name} folder={x}></Folder>
          ))}
        </ul>
      ) : null}
    </li>
  )
}

const FolderButton = ({
  open,
  onClick,
}: {
  open: boolean
  onClick: () => void
}) => {
  return (
    <button
      style={{
        width: '22px',
        padding: '2px',
        borderRadius: '5px',
        border: '1px solid lightgray',
        color: 'var(--color-text)',
        margin: 0,
        backgroundColor: 'transparent',
        lineHeight: 1,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {open ? '-' : '+'}
    </button>
  )
}
