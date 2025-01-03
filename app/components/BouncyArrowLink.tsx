import { useState, useRef, useEffect, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from '@remix-run/react'

export const BouncyArrowLink = ({ children, href }: { children: ReactNode; href: string }) => {
  const [ref, hover] = useHover<HTMLAnchorElement>()

  // 1350px
  return (
    <Link to={href} ref={ref} className="mt-12 self-end xl:mt-4 flex items-center gap-2">
      {children} <Arrow hover={hover} />
    </Link>
  )
}

const Arrow = ({ hover }: { hover: boolean }) => {
  const prefersReducedMotion = useReducedMotion()
  const length = 180
  const width = length - 14.5 + 17 + 38
  const margin = -(width - 17)

  return (
    <svg
      width={width}
      height="12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: margin }}
    >
      <motion.path
        transition={{ type: 'spring', duration: prefersReducedMotion ? 0 : 0.7, bounce: 0.5 }}
        variants={stemVariants}
        initial="inactive"
        animate={hover ? 'active' : 'inactive'}
        fill="currentColor"
      />
      <motion.path
        transition={{ type: 'spring', duration: prefersReducedMotion ? 0 : 0.7, bounce: 0.5 }}
        variants={headVariants}
        initial="inactive"
        animate={hover ? 'active' : 'inactive'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
function useHover<T extends HTMLElement>() {
  const [value, setValue] = useState<boolean>(false)
  const ref = useRef<T | null>(null)
  const handleMouseOver = (): void => setValue(true)
  const handleMouseOut = (): void => setValue(false)
  useEffect(() => {
    const node = ref.current
    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)
      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseout', handleMouseOut)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current])
  return [ref, value] as const
}

const length = 180
const stemVariants = {
  inactive: {
    d: `M1 5.25H.25v1.5H1v-1.5Zm${14.5} 1.5a.75.75 0 0 0 0-1.5v1.5ZM1 6.75h${14.5}v-1.5H1v1.5Z`,
  },
  active: {
    d: `M1 5.25H.25v1.5H1v-1.5Zm${length} 1.5a.75.75 0 0 0 0-1.5v1.5ZM1 6.75h${length}v-1.5H1v1.5Z`,
  },
}
const headVariants = {
  inactive: {
    d: `m${11} 1 4.646 4.646a.5.5 0 0 1 0 .708L${11} 11`,
  },
  active: {
    d: `m${length - 3.5} 1 4.646 4.646a.5.5 0 0 1 0 .708L${length - 3.5} 11`,
  },
}
