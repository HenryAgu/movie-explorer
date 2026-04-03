import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types";
import { posterUrl } from "@/lib/tmbd";

function RatingBadge({ rating }: { rating: number }) {
  const color =
    rating >= 7 ? "text-green-400" : rating >= 5 ? "text-yellow-400" : "text-red-400";
  return <span className={`text-xs font-bold ${color}`}>★ {rating.toFixed(1)}</span>;
}

export function MovieCard({ movie }: { movie: Movie }) {
  const poster = posterUrl(movie.poster_path, "w342");
  const year = movie.release_date?.slice(0, 4);

  return (
    <Link href={`/movie/${movie.id}`} className="group block cursor-pointer">
      <div className="relative overflow-hidden rounded-xl bg-zinc-900 border border-gray-600 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 hover:border-yellow-500/30">
        
        {/* Poster */}
        <div className="relative aspect-[2/3] w-full bg-zinc-800">
          {poster ? (
            <Image
              src={poster}
              alt={movie.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            // fallback if no poster
            <div className="flex h-full items-center justify-center text-zinc-600">
              <span className="text-4xl">🎬</span>
            </div>
          )}

          {/* Rating badge */}
          <div className="absolute top-2 right-2 rounded-full bg-black/70 px-2 py-1 backdrop-blur-sm">
            <RatingBadge rating={movie.vote_average} />
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="line-clamp-1 text-sm font-semibold text-white group-hover:text-yellow-400 transition">
            {movie.title}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500">{year ?? "—"}</p>
        </div>

      </div>
    </Link>
  );
}