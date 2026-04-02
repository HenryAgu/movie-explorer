import { HERO } from "@/data";

export function HeroBanner() {
  return (
    <div className="relative w-full h-[420px] xl:h-[540px] 2xl:h-[680px] overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950">
      {/* Decorative blobs */}
      <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end pb-12 px-6 sm:px-10 xl:px-16">
        <div className="max-w-xl">
          <span className="inline-block rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400 mb-3">
            🔥 Trending Now
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-3 tracking-tight">
            {HERO.title}
          </h1>
          <div className="flex items-center gap-3 mb-4 text-sm text-zinc-400">
            {/* <RatingBadge rating={HERO.rating} /> */}
            <span>•</span>
            <span>{HERO.year}</span>
          </div>
          <p className="text-sm sm:text-base text-zinc-300 line-clamp-3 mb-6 leading-relaxed">
            {HERO.overview}
          </p>
          <button className="inline-flex items-center gap-2 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 text-sm transition active:scale-95">
            <span>▶</span> View Details
          </button>
        </div>
      </div>
    </div>
  );
}