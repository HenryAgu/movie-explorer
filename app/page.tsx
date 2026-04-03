import { HeroBanner } from "@/features/movies/components/hero";
import LatestMovies from "@/features/movies/components/latest-movies";
import { getPopularMovies, getTrendingMovies } from "@/lib/tmbd";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { movieKeys } from "@/features/movies/api/query-keys";

export default async function Home() {
  const queryClient = getQueryClient();

  // Prefetch data on the server
  // Note: For infinite queries, we should use prefetchInfiniteQuery
  // to ensure the structure in the cache is correctly set as { pages, pageParams }
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: movieKeys.trending(),
      queryFn: getTrendingMovies,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: movieKeys.allPopular(),
      queryFn: ({ pageParam = 1 }) => getPopularMovies(pageParam),
      initialPageParam: 1,
    }),
  ]);

  const [trending, popular] = await Promise.all([
    getTrendingMovies().catch(() => ({ results: [] })),
    getPopularMovies(1).catch(() => ({ results: [] })),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen">
        <HeroBanner trending={trending.results?.[0]} />
        <LatestMovies initialPopular={popular.results || []} />
      </div>
    </HydrationBoundary>
  );
}
