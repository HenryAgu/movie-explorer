const BASE_URL = "https://api.themoviedb.org/3";

// ---- Base fetcher (runs server-side only) ----
async function tmdbFetch(path: string, params: Record<string, any> = {}) {
  const url = new URL(`${BASE_URL}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  if (!res.ok) throw new Error(`TMDB fetch failed: ${res.status}`);
  return res.json();
}

// ---- Image URL helpers ----
export const posterUrl = (path: string | null, size = "w342") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export const backdropUrl = (path: string | null, size = "w1280") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export const profileUrl = (path: string | null, size = "w185") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

// ---- Endpoints ----
export const getTrendingMovies = () =>
  tmdbFetch("/trending/movie/week");

export const getPopularMovies = (page = 1) =>
  tmdbFetch("/movie/popular", { page });

export const getNowPlaying = (page = 1) =>
  tmdbFetch("/movie/now_playing", { page });

export const getTopRated = (page = 1) =>
  tmdbFetch("/movie/top_rated", { page });

export const searchMovies = (query: string, page = 1) =>
  tmdbFetch("/search/movie", { query, page, include_adult: false });

export const getMovieDetails = (id: string | number) =>
  tmdbFetch(`/movie/${id}`, {
    append_to_response: "credits,videos,similar,watch/providers",
  });

export const getGenres = () =>
  tmdbFetch("/genre/movie/list");

export const getMoviesByGenre = (genreId: number, page = 1) =>
  tmdbFetch("/discover/movie", {
    with_genres: genreId,
    page,
    sort_by: "popularity.desc",
  });