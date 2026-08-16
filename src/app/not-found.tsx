import Link from 'next/link'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Compass className="h-10 w-10 text-accent mb-6" />
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-off-white mb-3">Page not found</h1>
      <p className="text-off-white/60 max-w-md mb-8">
        The page you&rsquo;re looking for doesn&rsquo;t exist, or the country isn&rsquo;t tracked in the atlas yet.
      </p>
      <div className="flex gap-4">
        <Link href="/countries" className="px-6 py-3 bg-accent hover:bg-accent-light text-primary font-bold transition-all">
          EXPLORE COUNTRIES
        </Link>
        <Link href="/" className="px-6 py-3 border border-muted-blue hover:border-off-white/50 text-off-white font-bold transition-all">
          HOME
        </Link>
      </div>
    </div>
  )
}
