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

    const chartColors = theme.chart; // Use theme chart colors

    const chart = createChart(chartRef.current, {
      width,
      height,
      layout: {
        background: { type: ColorType.Solid, color: theme.palette.background.default },
        textColor: chartColors.text,
      },
      grid: {
        vertLines: { color: chartColors.grid },
        horzLines: { color: chartColors.grid },
      },
      crosshair: { mode: 1 },
    });
    chartInstance.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: chartColors.up,
      downColor: chartColors.down,
      borderVisible: false,
      wickUpColor: chartColors.wickUp,
      wickDownColor: chartColors.wickDown,
    });
    candleSeriesRef.current = candleSeries;
    candleSeries.setData(candles);

    // Resize handler
    const handleResize = () => {
      if (chartRef.current) {
        chart.applyOptions({ width: chartRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [candles, height, theme, width]); // rebuild chart when theme changes

  // Update series on new candle data
  useEffect(() => {
    candleSeriesRef.current?.setData(candles);
  }, [candles]);

  return <div ref={chartRef} className="w-full h-full" />;
};
