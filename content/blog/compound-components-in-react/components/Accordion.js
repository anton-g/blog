import React, { useState, useContext } from 'react'

const AccordionContext = React.createContext(null)

export function Accordion({ children }) {
  const [activeKey, setActiveKey] = useState('item1')

  const setKey = newKey => {
    if (newKey === activeKey) setActiveKey(null)
    else setActiveKey(newKey)
  }

  return <AccordionContext.Provider value={{ activeKey, setKey }}>{children}</AccordionContext.Provider>
}

const Toggle = ({ children, eventKey, className }) => {
  const { setKey } = useContext(AccordionContext)

  return (
    <button className={className} onClick={() => setKey(eventKey)}>
      {children}
    </button>
  )
}

const Collapse = ({ children, eventKey }) => {
  const { activeKey } = useContext(AccordionContext)

  if (activeKey !== eventKey) return null

  return children
}

Accordion.Toggle = Toggle
Accordion.Collapse = Collapse
