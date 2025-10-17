import { NextResponse } from "next/server";

const FMP_API_KEY = process.env.FMP_API_KEY;
const BASE_URL = "https://financialmodelingprep.com/stable";

export async function GET() {
  try {
    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);

    // Format dates as YYYY-MM-DD
    const formatDate = (d: Date) =>
      `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate()
        .toString()
        .padStart(2, "0")}`;

    const from = formatDate(today);
    const to = formatDate(thirtyDaysLater);

    // Fetch all earnings in a single request
    const res = await fetch(
      `${BASE_URL}/earnings-calendar?from=${from}&to=${to}&apikey=${FMP_API_KEY}`
    );

    if (!res.ok) {
      console.error("Error fetching earnings:", res.status, res.statusText);
      return [];
    }

    const allData = await res.json();

    const topEarnings = allData.slice(0, 20);

    return NextResponse.json(topEarnings);
  } catch (err) {
    console.error("Error fetching earnings:", err);
    return NextResponse.json({ error: "Failed to fetch earnings" }, { status: 500 });
  }
}
