import { getPopularMovies, getTrendingMovies } from "@/lib/tmbd";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { movieKeys } from "@/lib/query-keys";
import { HeroBanner } from "@/components/hero";
import LatestMovies from "@/components/latest-movies";
import { SearchFilter } from "@/components/search-filter";
import { Suspense } from "react";

export default async function Home() {
  const queryClient = getQueryClient();

  // Prefetch data on the server
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: movieKeys.trending(),
      queryFn: getTrendingMovies,
    }).catch(() => { }),
    queryClient.prefetchInfiniteQuery({
      queryKey: movieKeys.allPopular(),
      queryFn: ({ pageParam = 1 }) => getPopularMovies(pageParam),
      initialPageParam: 1,
    }).catch(() => { })
  ]);

  const [trending, popular] = await Promise.all([
    getTrendingMovies().catch(() => ({ results: [] })),
    getPopularMovies(1).catch(() => ({ results: [] })),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen pb-20">
        <HeroBanner trending={trending.results?.[0]} />

        <Suspense fallback={<div className="h-24 " />}>
          <div className="mt-10 lg:mt-30">
            <SearchFilter />
          </div>
        </Suspense>

        <Suspense fallback={
          <div className="xl:px-16 px-5 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-zinc-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        }>
          <LatestMovies initialPopular={popular.results || []} />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
