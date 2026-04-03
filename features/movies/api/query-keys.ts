export const movieKeys = {
  all: ['movies'] as const,
  trending: () => [...movieKeys.all, 'trending'] as const,
  popular: (page: number) => [...movieKeys.all, 'popular', { page }] as const,
  allPopular: () => [...movieKeys.all, 'popular', 'infinite'] as const,
  details: (id: string | number) => [...movieKeys.all, 'detail', id] as const,
}
