import { searchMovies } from "@/lib/tmbd";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1");

  if (!query) {
    return NextResponse.json({ results: [], page: 1, total_pages: 0 });
  }

  try {
    const data = await searchMovies(query, page);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500 });
  }
}
