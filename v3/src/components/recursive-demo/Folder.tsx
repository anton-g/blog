import React, { useState } from 'react'
import { FolderType } from './Folders'

export function Folder({ folder }: { folder: FolderType }) {
  const [open, setOpen] = useState(true)

  const hasChildren = !!folder.children

  return (
    <li style={{ marginTop: '4px' }}>
      {hasChildren && <FolderButton open={open} onClick={() => setOpen((o) => !o)}></FolderButton>}
      <span className="mdx" style={{ paddingLeft: !hasChildren ? '0px' : '6px' }}>
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

const FolderButton = ({ open, onClick }: { open: boolean; onClick: () => void }) => {
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
      }}
      onClick={onClick}
    >
      {open ? '-' : '+'}
    </button>
  )
}
