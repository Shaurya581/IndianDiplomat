'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Globe, Menu, X } from 'lucide-react'
import { SearchOverlay } from './SearchOverlay'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/countries', label: 'Explore' },
  { href: '/map', label: 'Map' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/compare', label: 'Compare' },
  { href: '/dashboard', label: 'Dashboard' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-muted-blue/30 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-india" />
              <span className="font-heading font-bold text-lg tracking-wider text-off-white">
                INDIAN DIPLOMATIC RELATIONS
              </span>
            </Link>

            <div className="hidden md:flex gap-6 text-sm font-medium text-off-white/80">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-accent transition-colors uppercase ${pathname === link.href ? 'text-accent' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-off-white/80 hover:text-accent transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden text-off-white/80 hover:text-accent"
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-muted-blue/30 bg-primary">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1 text-sm font-medium text-off-white/80">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 border-b border-muted-blue/20 uppercase hover:text-accent transition-colors ${pathname === link.href ? 'text-accent' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  )
}
