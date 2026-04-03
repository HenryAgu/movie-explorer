'use client'

import { Movie } from "@/types"
import { MovieCard } from "@/components/movie-card"
import { useInfiniteQuery } from "@tanstack/react-query"
import { movieKeys } from "../api/query-keys"
import { Loader2 } from "lucide-react"

const LatestMovies = ({ initialPopular }: { initialPopular: Movie[] }) => {
    const fetchPopular = async ({ pageParam = 1 }) => {
        const res = await fetch(`/api/movies/popular?page=${pageParam}`);
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: movieKeys.allPopular(),
        queryFn: fetchPopular,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
        initialData: {
            pages: [{ results: initialPopular, page: 1, total_pages: 500, total_results: 10000 }],
            pageParams: [1]
        }
    })

    const movies = data?.pages.flatMap(page => page.results || []) || [];

    return (
        <div className='xl:px-16 px-5 py-20'>
            <div className="flex items-end justify-between mb-10">
                <div>
                    <h2 className="text-3xl sm:text-5xl font-black text-black leading-none tracking-tighter uppercase">Latest Releases</h2>
                    <p className="mt-4 text-zinc-500 font-bold max-w-md">Discover the most popular movies trending right now in the world of cinema.</p>
                </div>
                <div className="hidden sm:block">
                    <div className="h-0.5 w-32 bg-yellow-500" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {movies.map((movie, index) => (
                    movie ? <MovieCard key={`${movie.id}-${index}`} movie={movie} /> : null
                ))}
            </div>

            {hasNextPage && (
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
