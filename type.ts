export type Movie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  backdrop_path: string | null;
  poster_path: string | null;
  genre_ids: number[];
  media_type: "movie" | "tv";
  original_language: string;
  adult: boolean;
  video: boolean;
};
export type TMDBPaginatedResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};