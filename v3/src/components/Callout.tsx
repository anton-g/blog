import { ReactNode } from 'react'

export const Callout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children} {5 + 7}
    </div>
  )
}
