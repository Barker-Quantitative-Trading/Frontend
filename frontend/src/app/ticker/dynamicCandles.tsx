import { useState, useEffect } from "react";
import { CandleData } from "@/widgets/Chart";

export default function useDynamicCandles(paused = false) {
  // Start with some initial candles
  const [candles, setCandles] = useState<CandleData[]>([
    { time: '2023-10-01', open: 100, high: 110, low: 90, close: 105 },
    { time: '2023-10-02', open: 105, high: 115, low: 95, close: 100 },
    { time: '2023-10-03', open: 100, high: 120, low: 99, close: 119 },
    { time: '2023-10-04', open: 119, high: 125, low: 110, close: 120 },
    { time: '2023-10-05', open: 120, high: 130, low: 115, close: 128 },
  ]);

  // Dynamically add new candles
  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) return; // do nothing if paused
      setCandles(prev => {
        const last = prev[prev.length - 1];

        // Parse last candle's date
        const [year, month, day] = last.time.split('-').map(Number);
        const lastDate = new Date(year, month - 1, day);

        // Increment 1 day
        const nextDate = new Date(lastDate);
        nextDate.setDate(lastDate.getDate() + 1);

        // Format YYYY-MM-DD
        const yyyy = nextDate.getFullYear();
        const mm = String(nextDate.getMonth() + 1).padStart(2, '0');
        const dd = String(nextDate.getDate()).padStart(2, '0');

        const nextClose = last.close + (Math.random() * 10 - 5);
        const nextCandle: CandleData = {
          time: `${yyyy}-${mm}-${dd}`,
          open: last.close,
          high: last.close + Math.random() * 10,
          low: last.close - Math.random() * 10,
          close: nextClose,
        };

        // Keep last 500 candles
        return [...prev.slice(-500), nextCandle];
      });
    }, 50);

    return () => clearInterval(interval);
  }, [paused]);

  return candles;
}
