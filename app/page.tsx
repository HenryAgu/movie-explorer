import { getPopularMovies, getTrendingMovies } from "@/lib/tmbd";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { movieKeys } from "@/lib/query-keys";
import { HeroBanner } from "@/components/hero";
import LatestMovies from "@/components/latest-movies";

export default async function Home() {
  const queryClient = getQueryClient();

  // Prefetch data on the server
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
