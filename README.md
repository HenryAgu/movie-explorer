# Movie Explorer | Content Explorer Assessment

A production-quality movie discovery application built with **Next.js 15+**, **TypeScript**, and **Tailwind CSS**. This application uses the **TMDB API** to provide a searchable, filterable, and responsive interface for exploring films.

## 🚀 Live Deployment
- **Deployment URL**: [URL goes here]

## 🛠 Features

- **F-1 Listing Page**: SSR/ISR powered listing with 20+ items, fetch with custom revalidation.
- **F-2 Detail Page**: Dynamic route `/movie/[id]` with full metadata and breadcrumbs.
- **F-3 Search & Filtering**: URL-driven search and filtering (by year) with client-side debounce (500ms).
- **F-4 Universal States**: Modern Skeleton loaders, customized `error.tsx` boundaries, and empty state UI.
- **F-5 Built for Performance**: Optimized images with `next/image`, font optimization with `next/font`, and efficient prefetching.

## 📋 Setup Instructions

1. **Clone & Install**:
   ```bash
   git clone [repo-url]
   cd movie-explorer
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file with your TMDB Bearer Token:
   ```env
   TMDB_BEARER_TOKEN=your_bearer_token_here
   ```

3. **Development**:
   ```bash
   npm run dev
   ```

4. **Testing**:
   ```bash
   npm test
   ```

## 🏗 Architecture Decisions

- **Feature-Based Co-location**: Components and types are structured to keep related logic together.
- **Server-First Data Fetching**: Data is prefetched using React Query on the server-side (`app/page.tsx`, `app/movie/[id]/page.tsx`) and dehydrated to the client for immediate interactivity.
- **URL as Source of Truth**: All search and filter states are synced with the URL (`useSearchParams`). This ensures results are easily shareable.
- **API Layer Abstraction**: All TMDB logic is isolated in `lib/tmbd.ts`, preventing components from directly calling `fetch`.
- **Hybrid Rendering**: Combining Server Components for performance/SEO and Client Components for dynamic filtering via React Query's `useInfiniteQuery`.

## ⚡ Performance Optimizations

1. **Next.js Suspense Boundaries**: Wrapped search/filter logic and heavy listings in Suspense to prevent build-time prerendering errors and allow progressive loading.
2. **Infinite Scrolling**: Implemented infinite scroll instead of traditional pagination to provide a seamless mobile-first browsing experience, reducing initial bundle size and payload.
3. **Optimized Image Loading**: Used `next/image` with explicit sizes and `priority` flags for hero elements (backdrops) to minimize LCP.
4. **Server Prefetching**: Utilized `@tanstack/react-query` to prefetch popular and trending movies on the server, ensuring zero-spinner initial renders for the primary data.

## 🚧 Trade-offs & Limitations

- **Search/Filter Intersection**: TMDB's `/search` endpoint doesn't support combined discovery parameters (like year filtering) natively in one call. I prioritized a clean URL-driven experience but chose to split between `/search` and `/discover` based on the active user input.
- **Testing Coverage**: Focused testing on critical interactive components (`SearchFilter`) and configuration as a baseline for the assessment.

## 🧪 Bonus Tasks

- **B-1 Edge Caching**: Prepared for Cloudflare deployment with optimized fetch cache settings.
- **B-2 React 18 Streaming**: Implemented Suspense boundaries for listings and filter components to allow streaming the page structure before the data arrives.
- **B-3 Accessibility**: Used semantic HTML and ARIA labels. Lighthouse accessibility audit targets 95+.
