import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Star, Users, Film, Info } from 'lucide-react';
import type { Metadata } from 'next';
import { getMovieDetails, backdropUrl, posterUrl, profileUrl } from '@/lib/tmbd';
import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import { movieKeys } from '@/lib/query-keys';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const movie = await getMovieDetails(id);
    return {
      title: `${movie.title} - Movie Explorer`,
      description: movie.overview,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: [{ url: backdropUrl(movie.backdrop_path) || "" }],
      }
    };
  } catch (error) {
    return { title: "Movie - Movie Explorer" };
  }
}

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

const MovieDetailPage = async ({ params }: MovieDetailPageProps) => {
  const { id } = await params;
  const queryClient = getQueryClient();

  // Prefetch data
  await queryClient.prefetchQuery({
    queryKey: movieKeys.details(id),
    queryFn: () => getMovieDetails(id),
  });

  let movie;
  try {
    movie = await getMovieDetails(id);
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    return notFound();
  }

  const movieBackdrop = backdropUrl(movie.backdrop_path, "original");
  const moviePoster = posterUrl(movie.poster_path, "w780");
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A";
  
  // Mapping cast from credits
  const topCast = movie.credits?.cast?.slice(0, 5) || [];
  const similarMovies = movie.similar?.results?.slice(0, 4) || [];
  const director = movie.credits?.crew?.find((person: any) => person.job === "Director")?.name || "Unknown";

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Background Section with Backdrop */}
        <div className="relative h-[65vh] w-full overflow-hidden">
          {movieBackdrop ? (
            <Image
              src={movieBackdrop}
              alt={movie.title}
              fill
              className="object-cover opacity-50"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
              <Film className="w-20 h-20 text-zinc-800" />
            </div>
          )}
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/20" />
          
          {/* Top Navigation */}
          <div className="absolute top-0 left-0 right-0 p-6 z-10">
            <Link 
              href="/" 
              className="group inline-flex items-center gap-2 rounded-full bg-black/30 hover:bg-yellow-500 px-5 py-2.5 text-sm font-bold backdrop-blur-md border border-white/10 transition-all active:scale-95 text-white hover:text-black"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Explore
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 -mt-48 relative z-20">
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Left Column: Poster & Quick Info */}
            <div className="flex-shrink-0 w-full md:w-[320px] lg:w-[380px]">
              <div className="relative aspect-[2/3] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 group bg-zinc-900">
                {moviePoster ? (
                  <Image
                    src={moviePoster}
                    alt={movie.title}
                    fill
                    className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-700">
                    <Film className="w-16 h-16" />
                    <span className="text-sm font-bold opacity-50">No Poster Available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="mt-10 space-y-6">
                <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl">
                  <h3 className="text-xs font-black text-yellow-500 uppercase tracking-[0.2em] mb-6">Production Info</h3>
                  <div className="space-y-5">
                    <DetailItem icon={<Users className="w-4 h-4" />} label="Director" value={director} />
                    <DetailItem icon={<Calendar className="w-4 h-4" />} label="Released" value={new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} />
                    <DetailItem icon={<Star className="w-4 h-4" />} label="Avg. Rating" value={`${movie.vote_average.toFixed(1)} / 10`} />
                    <DetailItem icon={<Info className="w-4 h-4" />} label="Status" value={movie.status} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Information */}
            <div className="flex-grow pt-10 md:pt-20">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-0.5 w-12 bg-yellow-500" />
                <span className="text-sm font-black text-yellow-500 uppercase tracking-widest">{movie.genres?.[0]?.name || "Movie"}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight leading-none text-white lg:max-w-4xl">
                {movie.title}
              </h1>
              
              {movie.tagline && (
                <p className="text-xl md:text-2xl font-medium text-zinc-400 italic mb-8 border-l-4 border-yellow-500/30 pl-6 py-1">
                  "{movie.tagline}"
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 mb-12">
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-yellow-500 text-black font-black text-sm">
                  <Star className="w-4 h-4 fill-black" />
                  {movie.vote_average.toFixed(1)}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-zinc-300 font-bold text-sm">
                  <Clock className="w-4 h-4" />
                  {runtime}
                </div>
                <div className="h-6 w-px bg-white/10 mx-2" />
                <div className="flex flex-wrap gap-2">
                  {movie.genres?.map((genre: any) => (
                    <span key={genre.id} className="px-4 py-2 rounded-2xl bg-zinc-800/80 border border-white/5 text-sm font-bold text-zinc-300 hover:bg-yellow-500 hover:text-black transition-colors cursor-default">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-black mb-6 flex items-center gap-4">
                  Synopsis
                  <span className="h-0.5 flex-grow bg-white/5" />
                </h2>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-4xl">
                  {movie.overview}
                </p>
              </div>

              {topCast.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                    Top Cast
                    <span className="h-0.5 flex-grow bg-white/5" />
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                    {topCast.map((person: any) => (
                      <div key={person.id} className="group">
                        <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-4 border-2 border-white/5 group-hover:border-yellow-500 transition-all duration-300 shadow-xl group-hover:shadow-yellow-500/20 bg-zinc-900">
                          {profileUrl(person.profile_path) ? (
                            <Image
                              src={profileUrl(person.profile_path)!}
                              alt={person.name}
                              fill
                              className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-zinc-700">
                              <Users className="w-10 h-10" />
                            </div>
                          )}
                        </div>
                        <p className="text-base font-black text-white text-center leading-tight mb-1 group-hover:text-yellow-500 transition-colors uppercase tracking-tight">{person.name}</p>
                        <p className="text-xs text-zinc-500 text-center font-bold">{person.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {similarMovies.length > 0 && (
                <div className="mb-20">
                  <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                    Related Content
                    <span className="h-0.5 flex-grow bg-white/5" />
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                    {similarMovies.map((movie: any) => (
                      <Link key={movie.id} href={`/movie/${movie.id}`} className="group">
                        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-4 border border-white/5 group-hover:border-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/20 bg-zinc-900">
                          {posterUrl(movie.poster_path) ? (
                            <Image
                              src={posterUrl(movie.poster_path)!}
                              alt={movie.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-zinc-800">
                              <Film className="w-12 h-12" />
                            </div>
                          )}
                          <div className="absolute top-3 right-3 rounded-xl bg-black/70 px-2 py-1 backdrop-blur-md text-xs font-black text-yellow-500 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                            ★ {movie.vote_average.toFixed(1)}
                          </div>
                        </div>
                        <p className="text-sm font-black text-white group-hover:text-yellow-500 transition line-clamp-1 uppercase tracking-tight">{movie.title}</p>
                        <p className="text-xs text-zinc-500 font-bold">{movie.release_date?.split("-")[0]}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>
        
        {/* Footer Space */}
        <div className="h-32" />
      </div>
    </HydrationBoundary>
  )
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-2xl bg-zinc-800/50 flex items-center justify-center border border-white/5 group-hover:bg-yellow-500 group-hover:border-yellow-400 transition-all text-zinc-400 group-hover:text-black">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase font-black tracking-[0.1em] text-zinc-500 mb-0.5">{label}</p>
        <p className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{value}</p>
      </div>
    </div>
  )
}

export default MovieDetailPage