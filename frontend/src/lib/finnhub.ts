const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

if (!FINNHUB_API_KEY) {
  throw new Error("Missing FINNHUB_API_KEY in environment variables");
}

export async function fetchFromFinnhub(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`https://finnhub.io/api/v1/${endpoint}`);
  url.searchParams.set("token", FINNHUB_API_KEY!);
  Object.entries(params).forEach(([key, val]) => url.searchParams.set(key, val));

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Finnhub API error: ${res.status}`);
  }
  return res.json();
}
