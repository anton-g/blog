import { ReactNode } from 'react'

export const BlogRoll = () => {
  return (
    <div className="w-full h-14 bg-gray-950 text-gray-50 text-[2rem] font-serif flex items-center">
      <span className="pl-2 pr-4 select-none cursor-grab">BlogRoll:</span>
      <Marquee>
        •<Link href="https://www.atrost.com">Alex Trost</Link>•
        <Link href="http://www.bjoreman.com">Fredrik Björeman</Link>•
        <Link href="https://cassidoo.co">Cassidy Williams</Link>•
        <Link href="https://wtw.dev/">Ben Holmes</Link>•
        <Link href="https://wattenberger.com">Amelia Wattenberger</Link>•
        <Link href="https://twitter.com/chrisferdinandi">Chris Ferdinandi</Link>•
        <Link href="https://whitep4nth3r.com/">Salma Alam-Naylor</Link>•
        <Link href="https://www.joshwcomeau.com">Josh W. Comeau</Link>•
        <Link href="https://www.barbarianmeetscoding.com">Jaime González García</Link>•
        <Link href="https://www.sarasoueidan.com">Sara Soueidan</Link>•
        <Link href="https://theworst.dev">Kurt Kemple</Link>•
        <Link href="https://twitter.com/tkomstadius">Therése Komstadius</Link>•
        <Link href="https://charliegerard.dev">Charlie Gerard</Link>•
        <Link href="https://sara.fail">Sara Vieira</Link>•<Link href="https://huangxuan.me">Xuan Huang</Link>•
        <Link href="https://erikras.com">Erik Rasmussen</Link>•
        <Link href="https://hakim.se">Hakim El Hattab</Link>•
        <Link href="https://bruno-simon.com">Bruno Simon</Link>•
        <Link href="http://rachelnabors.com">Rachel Nabors</Link>•
        <Link href="https://mxb.dev/">Max Böck</Link>•
        <Link href="https://maggieappleton.com/">Maggie Appleton</Link>•
        <Link href="https://twitter.com/jh3yy">Jhey Thompkins</Link>•
        <Link href="https://lynnandtonic.com/">Lynn Fisher</Link>•
      </Marquee>
    </div>
  )
}

const Link = ({ children, href }: { children: ReactNode; href: string }) => {
  return (
    <a className="hover:underline decoration-wavy decoration-rose-500" href={href}>
      {children}
    </a>
  )
}

const Marquee = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full overflow-hidden relative flex items-center">
      <div className="w-max absolute overflow-hidden animate-marquee hover:animate-pause flex gap-4">
        {children}
      </div>
    </div>
  )
}
