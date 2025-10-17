import { NextResponse } from "next/server";
import { fetchFromFinnhub } from "@/lib/finnhub";

export async function GET() {
  try {
    const data = await fetchFromFinnhub("news", { category: "general" });
    return NextResponse.json(data.slice(0, 10));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
