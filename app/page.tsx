import { HeroBanner } from "@/components/hero";
import LatestMovies from "@/components/latest-movies";
import { getPopularMovies, getTrendingMovies } from "@/lib/tmbd";

export default async function Home() {
  const [trending, popular] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(1),
  ]);

  console.log(trending.results[0]);
  return (
    <div className="min-h-screen">
      <HeroBanner trending={trending.results[0]} />
      <LatestMovies trending={trending.results} />
    </div>
  );
}
