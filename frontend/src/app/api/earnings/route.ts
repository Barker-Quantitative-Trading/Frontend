import { NextResponse } from "next/server";

const FMP_API_KEY = process.env.FMP_API_KEY; // no NEXT_PUBLIC prefix

export async function GET() {
  try {
    // Get today + next 2 days
    const today = new Date();
    const dates: string[] = [];
    for (let i = 0; i < 3; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d.toISOString().split("T")[0]);
    }

    // Fetch earnings for each day
    const responses = await Promise.all(
      dates.map((date) =>
        fetch(
          `https://financialmodelingprep.com/stable/earnings-calendar?from=${date}&to=${date}&apikey=${FMP_API_KEY}`
        )
      )
    );

    const allData = (await Promise.all(responses.map((r) => r.json()))).flat();

    // Limit payload size if you want
    const topEarnings = allData.slice(0, 20);

    return NextResponse.json(topEarnings);
  } catch (err) {
    console.error("Error fetching earnings:", err);
    return NextResponse.json({ error: "Failed to fetch earnings" }, { status: 500 });
  }
}
