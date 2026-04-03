'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Search, X } from 'lucide-react'

export function SearchFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Initial states from URL
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [year, setYear] = useState(searchParams.get('year') || '')

  // Update URL with debounce or immediately for filters
  const updateParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    // Reset page if searching/filtering
    params.delete('page')

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query !== (searchParams.get('q') || '')) {
        updateParams({ q: query })
      }
    }, 500)

    return () => clearTimeout(handler)
  }, [query])

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setYear(val)
    updateParams({ year: val })
  }

  const clearFilters = () => {
    setQuery('')
    setYear('')
    router.push(pathname, { scroll: false })
  }

  const years = Array.from({ length: 126 }, (_, i) => (2025 - i).toString())

  return (
    <div className="w-full max-w-7xl mx-auto px-6 mb-12">
      <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-4 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row gap-4 items-center">
        
        {/* Search Input */}
        <div className="relative flex-grow w-full group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" />
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-zinc-950/50 border border-white/5 focus:border-yellow-500/50 rounded-3xl py-4 pl-14 pr-6 text-sm font-bold text-white placeholder:text-zinc-600 outline-none transition-all focus:ring-4 focus:ring-yellow-500/10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-48">
            <select
              value={year}
              onChange={handleYearChange}
              className="w-full bg-zinc-950/50 border border-white/5 focus:border-yellow-500/50 rounded-2xl py-4 px-6 text-sm font-bold text-white outline-none appearance-none transition-all cursor-pointer text-center"
            >
              <option value="">Filter by Year</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {(query || year) && (
            <button
              onClick={clearFilters}
              className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/50 text-zinc-400 hover:text-red-500 transition-all active:scale-95"
              title="Clear all filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {isPending && (
        <div className="mt-4 flex justify-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-500/50 animate-pulse">Searching...</p>
        </div>
      )}
    </div>
  )
}
