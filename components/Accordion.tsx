import React, { useState, useContext, ReactNode } from 'react'

const AccordionContext = React.createContext<{
  activeKey: string | null
  setKey: (key: string) => void
}>(null!)

export default function Accordion({ children }: { children: ReactNode }) {
  const [activeKey, setActiveKey] = useState<string | null>('item1')

  const setKey = (newKey: string) => {
    if (newKey === activeKey) setActiveKey(null)
    else setActiveKey(newKey)
  }

  return (
    <AccordionContext.Provider value={{ activeKey, setKey }}>
      {children}
    </AccordionContext.Provider>
  )
}

const Toggle = ({
  children,
  eventKey,
  className,
}: {
  children: ReactNode
  eventKey: string
  className?: string
}) => {
  const { setKey } = useContext(AccordionContext)

  return (
    <button className={className} onClick={() => setKey(eventKey)}>
      {children}
    </button>
  )
}

const Content = ({
  children,
  eventKey,
}: {
  children: ReactNode
  eventKey: string
}) => {
  const { activeKey } = useContext(AccordionContext)

  if (activeKey !== eventKey) return null

  return <>{children}</>
}

Accordion.Toggle = Toggle
Accordion.Content = Content
