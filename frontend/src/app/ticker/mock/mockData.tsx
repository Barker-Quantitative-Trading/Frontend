"use client";

import { useState, useEffect, useCallback } from "react";
import { ChartType, SeriesData } from "@/widgets/Chart";
import { BusinessDay } from "lightweight-charts";

function addDays(date: BusinessDay, days: number): BusinessDay {
  const d = new Date(date.year, date.month - 1, date.day);
  d.setDate(d.getDate() + days);
  return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
}

function generateInitialData(chartType: ChartType): SeriesData[] {
  const start: BusinessDay = { year: 2023, month: 10, day: 1 };
  const points = [];
  let lastBase = 100; // starting price

  for (let i = 0; i < 500; i++) {
    const time = addDays(start, i);

    // small random walk step
    const base = lastBase + (Math.random() * 10 - 5);
    lastBase = base;

    if (chartType === "Bar" || chartType === "Candlestick") {
      const open = base + (Math.random());
      const close = base + (Math.random() * 10 - 5);
      const high = Math.max(open, close) + Math.random() * 5;
      const low = Math.min(open, close) - Math.random() * 5;

      points.push({ time, open, high, low, close });
    } else {
      points.push({ time, value: base });
    }
  }

  return [{ type: chartType, data: points }];
}

export default function useMockSeriesData(chartType: ChartType, paused = false) {
  const [data, setData] = useState<SeriesData[]>(() => generateInitialData(chartType));

  // 🔁 Allow external reset (e.g. from toolbar)
  const resetSeriesData = useCallback((newType: ChartType) => {
    setData(generateInitialData(newType));
  }, []);

  // ⏱️ Continuous updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) return;
      setData((prev) =>
        prev.map((series) => {
          const last = series.data[series.data.length - 1];
          if (!last) return series;

          const lastBD = last.time as BusinessDay;
          const nextTime = addDays(lastBD, 1);

          if ("open" in last && "close" in last) {
            const nextCandle = {
              time: nextTime,
              open: last.close,
              high: last.close + Math.random() * 5,
              low: last.close - Math.random() * 5,
              close: last.close + (Math.random() * 10 - 5),
            };
            return { ...series, data: [...series.data.slice(-500), nextCandle] };
          }

          if ("value" in last) {
            const nextPoint = {
              time: nextTime,
              value: last.value + (Math.random() * 10 - 5),
            };
            return { ...series, data: [...series.data.slice(-500), nextPoint] };
          }

          return series;
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [paused]);

  const symbol = "Mock Data";
  return { symbol, data, resetSeriesData };
}
