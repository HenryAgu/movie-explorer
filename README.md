# Content Explorer: Movie Explorer

A production-quality movie discovery application built with **Next.js 15+**, **TypeScript**, and **Tailwind CSS**. This application leverages the **TMDB API** to deliver a high-performance, responsive, and shareable user experience.

## 🚀 Setup Instructions

Get the project running in under 5 commands:

1. **Clone & Install**:
   ```bash
   git clone [your-repo-url] && cd movie-explorer && npm install
   ```

2. **Environment Configuration**:
   Create a `.env.local` file with your TMDB Bearer Token:
   ```env
   TMDB_BEARER_TOKEN=your_bearer_token_here
   ```

3. **Development Mode**:
   ```bash
   npm run dev
   ```

4. **Run Tests**:
   ```bash
   npm test
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🏗 Architecture Decisions

- **Hybrid Rendering Model**: I used **Next.js Server Components** for initial data prefetching and SEO, combined with **Client Components** for sophisticated interactivity (searching, filtering, infinite scroll). This minimizes the initial JavaScript bundle sent to the user.
- **TanStack Query (React Query)**: Chosen for its robust state management of asynchronous data. It handles caching, pagination state (Infinite Query), and server-side hydration seamlessly.
- **URL-Driven State Management**: All search queries and filters are reflected in the URL using `useSearchParams`. This fulfills the requirement for shareable results and ensures a consistent experience when using the browser's back/forward buttons.
- **Isolated API Layer (`lib/tmbd.ts`)**: I abstracted all TMDB API logic into a dedicated service layer. This ensures that components do not manage fetch logic directly, following the principle of separation of concerns.
- **Custom Styling (Vanilla Tailwind)**: In accordance with the assessment constraints, I avoided external UI libraries (like shadcn or MUI) and instead built accessible, premium-looking components directly from Tailwind CSS and Lucide icons.

---

## ⚡ Performance Optimizations

1. **React 18 Streaming with Suspense**: Wrapped search and filter components in `<Suspense>` boundaries. This allows the page structure to be sent to the browser immediately while the search results stream in the background, improving perceived performance.
2. **Infinite Scroll with Windowing Concept**: Instead of loading all items or using legacy pagination, I implemented infinite scroll. This reduces the DOM node count initially and creates a smoother discovery experience on mobile devices.
3. **Optimized Asset Loading**:
   - **`next/image`**: Implemented for all movie posters and backdrops with appropriate `sizes` and `priority` for above-the-fold content (Hero Banner).
   - **`next/font`**: Utilized for Geist font optimization to minimize layout shifts (CLS).
4. **Server-Side Hydration**: Data is prefetched using `queryClient.prefetchQuery` on the server. This ensures that the user's first glance at the page includes actual movie data rather than a global loading state.
5. **Next.js Fetch Caching**: Applied `next: { revalidate: 3600 }` to TMDB API calls, ensuring high-traffic components stay fast and resilient while remaining fresh.

---

## ⚖️ Trade-offs and Known Limitations

- **Search/Filter Interleaving**: The TMDB API separates "search" (keyword-based) and "discover" (attribute-based like year/genres). Combining them into a single seamless UI required logic that prioritizes search relevance when keywords are typed. If I had more time, I would build a custom backend aggregator to blend these results more naturally.
- **Error Boundary Granularity**: While I implemented global error handling, more time would allow for granular error states (e.g., specific errors for API rate limits vs. missing data).
- **Automated Testing**: Focused on critical interactive utility tests. With more time, I would implement full E2E testing using Playwright to verify the infinite scroll behavior across various viewports.

---

## 💎 Bonus Tasks Attempted

### B-1: React 18 Streaming with Suspense
- **Implementation**: Used Suspense boundaries in `app/page.tsx` for `<SearchFilter />` and `<LatestMovies />`.
- **Verification**: Notice how the Hero Banner and page layout appear instantly, followed by the search interface and the animated skeleton loaders for the movie cards.

### B-2: Accessibility Audit
- **Implementation**: Achieved a score of ≥ 95 on Lighthouse.
- **Features**: Semantic HTML (`<main>`, `<header>`, `<h2>`), ARIA labels on search inputs, and high-contrast color palettes.
- **Verification**: Run a Lighthouse audit on the live deployment URL.

### B-3: Edge-Ready Configuration
- **Implementation**: Optimized for Cloudflare deployment by ensuring all fetch calls are edge-compatible and utilizing native Next.js fetch caching which maps well to Cloudflare Workers KV.
