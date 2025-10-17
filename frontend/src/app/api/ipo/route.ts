import { NextResponse } from "next/server";

const FMP_API_KEY = process.env.FMP_API_KEY; // server-side only

export async function GET() {
  try {
    // Get the next 3 days
    const today = new Date();
    const dates: string[] = [];
    for (let i = 0; i < 3; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d.toISOString().split("T")[0]);
    }

    // Fetch IPOs for each date
    const responses = await Promise.all(
      dates.map((date) =>
        fetch(
          `https://financialmodelingprep.com/stable/ipos-calendar?from=${date}&to=${date}&apikey=${FMP_API_KEY}`
        )
      )
    );

    const allData = (await Promise.all(responses.map((r) => r.json()))).flat();

    // Return just the essentials
    const topIpos = allData.slice(0, 20);

    return NextResponse.json(topIpos);
  } catch (err) {
    console.error("Error fetching IPOs:", err);
    return NextResponse.json({ error: "Failed to fetch IPOs" }, { status: 500 });
  }
}
