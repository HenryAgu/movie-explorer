'use client'

import React from 'react'
import { AlertCircle, RotateCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-[2rem] bg-red-500/10 border border-red-500/20 flex items-center justify-center animate-pulse">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>
        
        <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Something went wrong</h2>
        <p className="text-zinc-500 font-bold mb-10 leading-relaxed">
          {error.message || "We encountered an unexpected error while fetching the movie data. Our team has been notified."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-yellow-500 transition-all active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm border border-white/5 hover:border-white/20 transition-all active:scale-95"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
        
        {error.digest && (
          <p className="mt-12 text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
