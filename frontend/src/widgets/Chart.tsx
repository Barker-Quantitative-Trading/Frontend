'use client';
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  createChart,
  ColorType,
  CandlestickSeries,
  IChartApi,
  ISeriesApi,
} from 'lightweight-charts';
import { candleUpColor, candleDownColor, wickUpColor, wickDownColor } from '@/types/const';

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface ChartWidgetProps {
  width?: number;
  height?: number;
  candles: CandleData[];
  showSMA?: boolean;
  smaPeriod?: number;
}

export const Chart: React.FC<ChartWidgetProps> = ({
  width = 600,
  height = 400,
  candles,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'>>(null);

  const theme = useTheme();

  useEffect(() => {
    if (!chartRef.current) return;

    // Use theme.palette to get colors
    const isDark = theme.palette.mode === 'dark';
    const background = theme.palette.background.default;
    const textColor = theme.palette.text.primary;
    const gridColor = isDark ? '#2a2d3e' : '#ccc';
    const upColor = isDark ? candleUpColor : '#2e7d32';
    const downColor = isDark ? candleDownColor : '#c62828';

    const chart = createChart(chartRef.current, {
      width,
      height,
      layout: {
        background: { type: ColorType.Solid, color: background },
        textColor: textColor,
      },
      grid: {
        vertLines: { color: gridColor },
        horzLines: { color: gridColor },
      },
      crosshair: { mode: 1 },
    });
    chartInstance.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor,
      downColor,
      borderVisible: false,
      wickUpColor,
      wickDownColor,
    });
    candleSeriesRef.current = candleSeries;
    candleSeries.setData(candles);

    // Resize
    const handleResize = () => {
      chart.applyOptions({ width: chartRef.current!.clientWidth });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [candles, height, theme.palette, width]); // Rebuild chart when theme mode changes

  // Update series on data change
  useEffect(() => {
    candleSeriesRef.current?.setData(candles);
  }, [candles]);

  return <div ref={chartRef} className="w-full h-full" />;
};
