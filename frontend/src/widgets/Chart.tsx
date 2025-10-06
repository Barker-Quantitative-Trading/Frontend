'use client';
import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width,
      height,
      layout: {
        background: { type: ColorType.Solid, color: '#0f111a' },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: { color: '#2a2d3e' },
        horzLines: { color: '#2a2d3e' },
      },
      crosshair: {
        mode: 1,
      },
    });
    chartInstance.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: candleUpColor,
      downColor: candleDownColor,
      borderVisible: false,
      wickUpColor,
      wickDownColor,
    });
    candleSeriesRef.current = candleSeries;
    candleSeries.setData(candles);

    // Resize handling
    const handleResize = () => {
      chart.applyOptions({ width: chartRef.current!.clientWidth });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  // Update series on data change
  useEffect(() => {
    candleSeriesRef.current?.setData(candles);
  }, [candles]);

  return <div ref={chartRef} className="w-full h-full" />;
};
