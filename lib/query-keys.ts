export const movieKeys = {
  all: ['movies'] as const,
  trending: () => [...movieKeys.all, 'trending'] as const,
  popular: (page: number) => [...movieKeys.all, 'popular', { page }] as const,
  allPopular: () => [...movieKeys.all, 'popular', 'infinite'] as const,
  details: (id: string | number) => [...movieKeys.all, 'detail', id] as const,
  nowPlaying: (page: number) => [...movieKeys.all, 'nowPlaying', { page }] as const,
  topRated: (page: number) => [...movieKeys.all, 'topRated', { page }] as const,
  search: (query: string, page: number) => [...movieKeys.all, 'search', { query, page }] as const,
  genres: () => [...movieKeys.all, 'genres'] as const,
  byGenre: (genreId: number, page: number) => [...movieKeys.all, 'byGenre', { genreId, page }] as const,
}
