import { backdropUrl } from "@/lib/tmbd";
import { Movie } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { SearchFilter } from "./search-filter";

type HeroBannerProps = {
    trending: Movie;
};

export function HeroBanner({ trending }: HeroBannerProps) {
    if (!trending) return null;

    const backdrop = backdropUrl(trending.backdrop_path);
    const year = trending.release_date?.slice(0, 4);
    return (
        <div className="relative w-full h-[480px] xl:h-[580px] 2xl:h-[720px] overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950">
            {/* Background Image */}
            {backdrop ? (
                <Image
                    src={backdrop}
                    alt={trending.title || "Movie Backdrop"}
                    fill
                    priority
                    className="object-cover object-top"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span className="text-[200px] grayscale select-none">🎬</span>
                </div>
            )}

            <div className="absolute bg-black/50 inset-0"></div>

            {/* Top Bar with Search */}
            <div className="relative z-50 pt-10">
                <SearchFilter />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-end pb-12 px-6 sm:px-10 xl:px-16 pointer-events-none">
                <div className="max-w-xl pointer-events-auto">
                    <span className="inline-block rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400 mb-3">
                        Trending Now
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-3 tracking-tight">
                        {trending.title ?? "--"}
                    </h1>
                    <div className="flex items-center gap-3 mb-4 text-sm text-zinc-400">
                        {/* <RatingBadge rating={HERO.rating} /> */}
                        <span>•</span>
                        <span>{year || "--"}</span>
                    </div>
                    <p className="text-sm sm:text-base text-zinc-300 line-clamp-3 mb-6 leading-relaxed">
                        {trending.overview ?? "--"}
                    </p>
                    <Link href={`/movie/${trending.id}`} className="inline-flex items-center gap-2 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 text-sm transition active:scale-95">
                        <span>▶</span> View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}