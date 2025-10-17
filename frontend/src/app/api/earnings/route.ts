import { NextResponse } from "next/server";

const FMP_API_KEY = process.env.FMP_API_KEY;
const BASE_URL = "https://financialmodelingprep.com/stable";

import { Earnings } from "@/types/earnings"

function formatDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

export async function GET(): Promise<NextResponse> {
  try {
    const now = new Date();
    const end = new Date();
    end.setDate(now.getDate() + 10);

    const from = formatDate(now);
    const to = formatDate(end);

    const res = await fetch(`${BASE_URL}/earnings-calendar?from=${from}&to=${to}&apikey=${FMP_API_KEY}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch earnings" }, { status: res.status });
    }
    
    const data: Earnings[] = await res.json();
    
    // Reverse so latest dates appear first
    const reversed = [...data].reverse();

    return NextResponse.json(reversed);
  } catch (err) {
    console.error("Error fetching earnings:", err);
    return NextResponse.json({ error: "Failed to fetch earnings" }, { status: 500 });
  }
}