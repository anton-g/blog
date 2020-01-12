import React, { useState } from 'react'

export default function Folder({ folder }) {
  const [open, setOpen] = useState(true)

  const hasChildren = !!folder.children

  return (
    <li className="mdx">
      {hasChildren && (
        <FolderButton
          open={open}
          onClick={() => setOpen(o => !o)}
        ></FolderButton>
      )}
      <span
        className="mdx"
        style={{ paddingLeft: !hasChildren ? '26px' : '4px' }}
      >
        {folder.name}
      </span>
      {open && hasChildren ? (
        <ul className="mdx">
          {folder.children.map(x => (
            <Folder folder={x}></Folder>
          ))}
        </ul>
      ) : null}
    </li>
  )
}

const FolderButton = ({ open, onClick }) => {
  return (
    <button className="mdx" onClick={onClick}>
      {open ? '-' : '+'}
    </button>
  )
}
