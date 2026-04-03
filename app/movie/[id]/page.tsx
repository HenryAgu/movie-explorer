import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Star, Users } from 'lucide-react';
import type { Metadata } from 'next';

const MOVIE = {
  id: 1,
  title: "Dune: Part Two",
  tagline: "Long live the fighters.",
  release_date: "2024-03-01",
  vote_average: 8.8,
  vote_count: 12450,
  runtime: "166 min",
  overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
  backdrop_path: "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?auto=format&fit=crop&q=80&w=2000",
  poster_path: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800",
  genres: ["Sci-Fi", "Adventure", "Action"],
  director: "Denis Villeneuve",
  budget: "$190,000,000",
  revenue: "$711,844,358",
  cast: [
    { id: 1, name: "Timothée Chalamet", character: "Paul Atreides", profile_path: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" },
    { id: 2, name: "Zendaya", character: "Chani", profile_path: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" },
    { id: 3, name: "Rebecca Ferguson", character: "Lady Jessica", profile_path: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" },
    { id: 4, name: "Josh Brolin", character: "Gurney Halleck", profile_path: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" },
    { id: 5, name: "Austin Butler", character: "Feyd-Rautha Harkonnen", profile_path: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
  ],
  related: [
    { id: 101, title: "Dune", year: "2021", poster_path: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=400", rating: 8.0 },
    { id: 102, title: "Interstellar", year: "2014", poster_path: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400", rating: 8.6 },
    { id: 103, title: "Blade Runner 2049", year: "2017", poster_path: "https://images.unsplash.com/photo-1623150502742-6a849aa94be4?auto=format&fit=crop&q=80&w=400", rating: 8.0 },
    { id: 104, title: "Arrival", year: "2016", poster_path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400", rating: 7.9 },
  ]
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  // In a real application, you'd fetch the movie data by 'id' here.
  // Using hardcoded MOVIE data for demonstration.
  return {
    title: `${MOVIE.title} - Movie Explorer`,
    description: MOVIE.overview,
    openGraph: {
      title: MOVIE.title,
      description: MOVIE.overview,
      images: [
        {
          url: MOVIE.backdrop_path,
          width: 1200,
          height: 630,
          alt: MOVIE.title,
        }
      ],
      type: 'video.movie',
    },
    twitter: {
      card: 'summary_large_image',
      title: MOVIE.title,
      description: MOVIE.overview,
      images: [MOVIE.backdrop_path],
    },
  }
}

const MovieDetailPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Background Section with Backdrop */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={MOVIE.backdrop_path}
          alt={MOVIE.title}
          fill
          className="object-cover opacity-40"
          priority
        />
        {/* Gradient overlays for cinematic effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-transparent" />
        
        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 p-6 z-10">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 rounded-full bg-black/20 hover:bg-black/40 px-4 py-2 text-sm font-medium backdrop-blur-md border border-white/10 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-40 relative z-20">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Left Column: Poster */}
          <div className="flex-shrink-0 w-full md:w-[350px]">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black border border-white/10 group">
              <Image
                src={MOVIE.poster_path}
                alt={MOVIE.title}
                fill
                className="object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            
            <div className="mt-8 space-y-6">
              <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Quick Details</h3>
                <div className="space-y-4">
                  <DetailItem icon={<Users className="text-yellow-500 w-4 h-4" />} label="Director" value={MOVIE.director} />
                  <DetailItem icon={<Calendar className="text-yellow-500 w-4 h-4" />} label="Released" value={new Date(MOVIE.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                  <DetailItem icon={<Star className="text-yellow-500 w-4 h-4" />} label="Rating" value={`${MOVIE.vote_average} / 10`} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information */}
          <div className="flex-grow pt-4">
            <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-zinc-500">
              {MOVIE.title}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-yellow-500/90 italic mb-8">
              {MOVIE.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 font-bold">
                <Star className="w-4 h-4 fill-yellow-500" />
                {MOVIE.vote_average}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                <Clock className="w-4 h-4" />
                {MOVIE.runtime}
              </div>
              <div className="h-4 w-px bg-white/20 mx-1" />
              {MOVIE.genres.map(genre => (
                <span key={genre} className="px-3 py-1 rounded-full bg-zinc-800 text-sm font-medium hover:bg-zinc-700 transition cursor-default">
                  {genre}
                </span>
              ))}
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Synopsis
                <span className="h-[2px] flex-grow bg-gradient-to-r from-yellow-500/50 to-transparent ml-4" />
              </h2>
              <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl">
                {MOVIE.overview}
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Top Cast
                <span className="h-[2px] flex-grow bg-gradient-to-r from-yellow-500/50 to-transparent ml-4" />
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {MOVIE.cast.map(person => (
                  <div key={person.id} className="group">
                    <div className="relative aspect-square rounded-full overflow-hidden mb-3 border-2 border-white/5 group-hover:border-yellow-500/50 transition-colors">
                      <Image
                        src={person.profile_path}
                        alt={person.name}
                        fill
                        className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <p className="text-sm font-bold text-white text-center leading-tight mb-1">{person.name}</p>
                    <p className="text-xs text-zinc-500 text-center">{person.character}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Related Movies
                <span className="h-[2px] flex-grow bg-gradient-to-r from-yellow-500/50 to-transparent ml-4" />
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {MOVIE.related.map(movie => (
                  <Link key={movie.id} href={`/movie/${movie.id}`} className="group">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 border border-white/5 group-hover:border-yellow-500/30 transition-all shadow-lg hover:shadow-yellow-500/10">
                      <Image
                        src={movie.poster_path}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 rounded-lg bg-black/60 px-2 py-1 backdrop-blur-sm text-[10px] font-bold text-yellow-500">
                        ★ {movie.rating}
                      </div>
                    </div>
                    <p className="text-sm font-bold text-white group-hover:text-yellow-500 transition line-clamp-1">{movie.title}</p>
                    <p className="text-xs text-zinc-500">{movie.year}</p>
                  </Link>
                ))}
              </div>
            </div>
            
            <button className="rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-black px-8 py-4 text-lg transition-all active:scale-95 shadow-xl shadow-yellow-500/20 flex items-center gap-2">
              Watch Trailer
            </button>
          </div>
          
        </div>
      </div>
      
      {/* Footer Space */}
      <div className="h-20" />
    </div>
  )
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center border border-white/5">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-tighter text-zinc-500 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-zinc-200">{value}</p>
      </div>
    </div>
  )
}

export default MovieDetailPage