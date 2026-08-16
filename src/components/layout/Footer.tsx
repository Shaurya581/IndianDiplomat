import Link from 'next/link'
import { Globe } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-muted-blue/30 bg-primary-light mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-india" />
              <span className="font-heading font-bold text-lg tracking-wider text-off-white">
                INDIAN DIPLOMATIC RELATIONS
              </span>
            </Link>
            <p className="text-sm text-off-white/60 max-w-sm">
              India&rsquo;s relationships with the world — mapped, explained and contextualized. Covering all 195 UN member states plus Palestine and the Holy See.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-off-white">Explore</h4>
            <ul className="space-y-2 text-sm text-off-white/70">
              <li><Link href="/countries" className="hover:text-accent transition-colors">All Countries</Link></li>
              <li><Link href="/map" className="hover:text-accent transition-colors">Interactive Map</Link></li>
              <li><Link href="/dashboard" className="hover:text-accent transition-colors">Global Dashboard</Link></li>
              <li><Link href="/compare" className="hover:text-accent transition-colors">Compare Relations</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-off-white">Resources</h4>
            <ul className="space-y-2 text-sm text-off-white/70">
              <li><Link href="/methodology" className="hover:text-accent transition-colors">Methodology</Link></li>
              <li><Link href="/sources" className="hover:text-accent transition-colors">Data Sources</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About Project</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-muted-blue/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-off-white/50">
          <p>© {new Date().getFullYear()} Indian Diplomatic Relations. Educational and analytical purposes only.</p>
          <p>Relationship classifications are an independent analytical index — not an official government rating.</p>
        </div>
      </div>
    </footer>
  )
}
