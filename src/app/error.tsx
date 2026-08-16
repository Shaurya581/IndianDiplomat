'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <AlertTriangle className="h-10 w-10 text-poor mb-6" />
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-off-white mb-3">Something went wrong</h1>
      <p className="text-off-white/60 max-w-md mb-8">
        This page hit an unexpected error while loading. You can try again, or head back to the homepage.
      </p>
      <div className="flex gap-4">
        <button onClick={() => reset()} className="px-6 py-3 bg-accent hover:bg-accent-light text-primary font-bold transition-all">
          TRY AGAIN
        </button>
        <Link href="/" className="px-6 py-3 border border-muted-blue hover:border-off-white/50 text-off-white font-bold transition-all">
          HOME
        </Link>
      </div>
    </div>
  )
}
