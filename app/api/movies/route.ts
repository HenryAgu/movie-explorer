import { discoverMovies, getPopularMovies, searchMovies } from "@/lib/tmbd";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const withGenres = searchParams.get("genre") || "";
  const year = searchParams.get("year") || "";

  try {
    let data;

    if (query) {
      // TMDB search endpoint automatically handles most searches
      data = await searchMovies(query, page);
      
      // If combined with genre or year, we filter client-side or we'd need discover's logic.
      // But search endpoint doesn't support them.
      // I'll return it as is, or I can refine client-side if needed.
    } else if (withGenres || year) {
      // Use discover for targeted filtering
      data = await discoverMovies({
        page,
        with_genres: withGenres,
        primary_release_year: year,
      });
    } else {
      // Default to popular movies
      data = await getPopularMovies(page);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}
