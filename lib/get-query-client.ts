import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query'
import { cache } from 'react'

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
        dehydrate: {
          // per default, only successful queries are dehydrated,
          // but we can also include pending queries
          shouldDehydrateQuery: (query) =>
            defaultShouldDehydrateQuery(query) ||
            query.state.status === 'pending',
        },
      },
    })
)
