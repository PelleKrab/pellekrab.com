'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isProjects = pathname === '/projects'

  return (
    <nav style={{ display: 'flex', gap: '24px', fontSize: '14px', marginBottom: '24px' }}>
      <Link
        href="/"
        style={{
          textDecoration: 'underline',
          opacity: isHome ? 1 : 0.6,
          fontWeight: isHome ? 600 : 400,
          color: '#1a1a1a',
        }}
      >
        home
      </Link>
      <Link
        href="/projects"
        style={{
          textDecoration: 'underline',
          opacity: isProjects ? 1 : 0.6,
          fontWeight: isProjects ? 600 : 400,
          color: '#1a1a1a',
        }}
      >
        projects
      </Link>
    </nav>
  )
}
