'use client'

import React, { useMemo } from 'react'
import { Movie } from "@/type"
import { MovieCard } from "./movie-card"
import { useInfiniteQuery } from "@tanstack/react-query"
import { movieKeys } from "@/lib/query-keys"
import { Loader2, Film, Plus } from "lucide-react"
import { useSearchParams } from 'next/navigation'

interface LatestMoviesProps {
    initialPopular?: Movie[]
}

const LatestMovies = ({ initialPopular }: LatestMoviesProps) => {
    const searchParams = useSearchParams()
    
    // Sync React Query with URL params
    const q = searchParams.get('q') || ''
    const year = searchParams.get('year') || ''

    const fetchMovies = async ({ pageParam = 1 }) => {
        const url = new URL('/api/movies', window.location.origin)
        if (q) url.searchParams.set('query', q)
        if (year) url.searchParams.set('year', year)
        url.searchParams.set('page', pageParam.toString())

        const res = await fetch(url.toString())
        if (!res.ok) throw new Error("Failed to fetch")
        return res.json()
    }

    const queryKey = useMemo(() => {
        if (!q && !year) return movieKeys.allPopular()
        return [...movieKeys.all, 'listing', { q, year }]
    }, [q, year])

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        isError
    } = useInfiniteQuery({
        // The queryKey must include ALL params to ensure cache updates when URL changes
        queryKey,
        queryFn: fetchMovies,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1
            }
            return undefined
        },
        // If we have initialPopular and are on the default stay, use it to avoid initial spinner
        initialData: (initialPopular && !q && !year) ? {
            pages: [{ results: initialPopular, page: 1, total_pages: 100, total_results: 2000 }],
            pageParams: [1]
        } : undefined,
    })

    const movies = useMemo(() => data?.pages.flatMap(page => page.results || []) || [], [data])

    const sectionTitle = useMemo(() => {
        if (q) return `Searching for "${q}"`
        if (year) return "Filtered Results"
        return "Latest Releases"
    }, [q, year])

    if (isError) return (
        <div className="py-20 text-center">
            <p className="text-red-500 font-bold">Failed to load movies. Please try again later.</p>
        </div>
    )

    return (
        <div className='xl:px-16 px-5 py-20 min-h-[600px]'>
            <div className="flex items-end justify-between mb-12">
                <div>
                    <h2 className="text-3xl sm:text-5xl font-black text-black leading-none tracking-tighter uppercase">{sectionTitle}</h2>
                    <p className="mt-4 text-zinc-500 font-bold max-w-md">
                        {isPending ? "Updating library..." : `Found ${data?.pages[0]?.total_results?.toLocaleString() || 0} movies for you.`}
                    </p>
                </div>
                <div className="hidden sm:block">
                    <div className="h-0.5 w-32 bg-yellow-500" />
                </div>
            </div>

            {isPending ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-30">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="aspect-[2/3] bg-zinc-100 rounded-3xl animate-pulse" />
                    ))}
                </div>
            ) : movies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {movies.map((movie, index) => (
                        movie ? <MovieCard key={`${movie.id}-${index}`} movie={movie} /> : null
                    ))}
                </div>
            ) : (
                <div className="py-32 flex flex-col items-center justify-center text-center opacity-50">
                    <Film className="w-16 h-16 mb-6 text-zinc-300" />
                    <p className="text-2xl font-black text-zinc-400 capitalize">No movies found</p>
                    <p className="text-zinc-500 font-bold mt-2">Try adjusting your filters or searching for something else.</p>
                </div>
            )}

            {hasNextPage && !isPending && (
                <div className="mt-20 flex justify-center">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="group relative flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-yellow-500 hover:text-black transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isFetchingNextPage ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            <>
                                <Plus className="w-5 h-5" />
                                Load More Movies
                                <span className="absolute -inset-1 blur-xl bg-yellow-500/20 group-hover:bg-yellow-500/40 transition-colors rounded-full -z-10" />
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    )
}

export default LatestMovies
