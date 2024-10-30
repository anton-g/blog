import { TwitterLogoIcon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'
import { SoundToggle } from './SoundToggle'

export const Nav = ({ hideLogo }: { hideLogo?: boolean }) => {
  return (
    <nav className="w-full flex">
      <div className="font-title flex items-center text-xl">
        {!hideLogo && (
          <Link to="/" className="py-2 px-3">
            ag
          </Link>
        )}
      </div>
      <div className="ml-auto flex items-center leading-none py-2 px-3 gap-2">
        <SoundToggle />
        <a href="/feeds/feed.xml" aria-label="RSS feed for AntonGunnarsson.com">
          <svg
            height={20}
            width={20}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </a>
        <a href="https://twitter.com/awnton" aria-label="Anton Gunnarssons Twitter profile">
          <TwitterLogoIcon height="20px" width="20px" />
        </a>
      </div>
    </nav>
  )
}
