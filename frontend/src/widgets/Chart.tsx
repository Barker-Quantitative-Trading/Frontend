'use client';
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  createChart,
  ColorType,
  CandlestickSeries,
  SeriesOptionsMap,
  IChartApi,
  ISeriesApi,
  SeriesType,
} from 'lightweight-charts';

export interface CandleData { time: string; open: number; high: number; low: number; close: number; }
export interface LineData { time: string; value: number; }
export interface HistogramData { time: string; value: number; color?: string; }
export interface BarData { time: string; open: number; high: number; low: number; close: number; }
export interface AreaData { time: string; value: number; }
export interface BaselineData { time: string; value: number; baseValue: number; }
export interface CustomData { time: string; value: number; }

export interface SeriesData {
  type: 'candlestick' | 'line' | 'area' | 'histogram' | 'bar' | 'baseline' | 'custom';
  data: CandleData[] | LineData[] | HistogramData[] | BarData[] | AreaData[] | BaselineData[] | CustomData[];
}

export type ChartType = 'bar' | 'candlestick' | 'line' | 'area' | 'histogram' | 'baseline' | 'custom';

const seriesTypeMap: Record<ChartType, keyof SeriesOptionsMap> = {
  bar: 'Bar',
  candlestick: 'Candlestick',
  area: 'Area',
  baseline: 'Baseline',
  line: 'Line',
  histogram: 'Histogram',
  custom: 'Custom',
};

type SeriesApiMap = {
  candlestick: ISeriesApi<'Candlestick'>;
  line: ISeriesApi<'Line'>;
  area: ISeriesApi<'Area'>;
  histogram: ISeriesApi<'Histogram'>;
  baseline: ISeriesApi<'Baseline'>;
  bar: ISeriesApi<'Bar'>;
  custom: ISeriesApi<'Custom'>;
};

export interface Indicator {
  type: ChartType;
  data: SeriesData[];
}

export interface ChartWidgetProps {
  width?: number;
  height?: number;
  data: SeriesData[];
  chartType: ChartType;
  indicators?: Indicator[];
}

export const Chart: React.FC<ChartWidgetProps> = ({
  width = 600,
  height = 400,
  data,
  chartType,
  indicators,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi>(null);
  const mainSeriesRef = useRef<SeriesApiMap[ChartType] | null>(null);
  const indicatorRefs = useRef<Array<SeriesApiMap[ChartType]>>([]);

  const theme = useTheme();
  const chartColors = theme.chart; 

 const defaultSeriesOptions: SeriesOptionsMap = {
  Candlestick: {
    upColor: theme.chart.candleUp,
    downColor: theme.chart.candleDown,
    wickUpColor: theme.chart.wickUp,
    wickDownColor: theme.chart.wickDown,
    borderVisible: false,
  },
  Line: {
    color: theme.chart.line,
    lineWidth: 2,
  },
  Area: {
    topColor: theme.chart.areaTop,
    bottomColor: theme.chart.areaBottom,
    lineColor: theme.chart.line,
    lineWidth: 2,
  },
  Histogram: {
    color: theme.chart.volume,
  },
  Baseline: {
    topColor: theme.chart.baselineTop,
    bottomColor: theme.chart.baselineBottom,
    topLineColor: theme.chart.line,
    bottomLineColor: theme.chart.line,
  },
  Bar: {
    color: theme.chart.bar,
  },
  Custom: {
    color: theme.chart.custom,
  },
  };

  useEffect(() => {
    if (!chartRef.current) return;
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


    // Main series
    const mainSeries = chart.addSeries({
      type: seriesTypeMap[chartType],
      ...defaultSeriesOptions[chartType],
    });
    mainSeries.setData(data);
    mainSeriesRef.current = mainSeries;

    // Indicators
    indicatorRefs.current = indicators.map((ind) => {
      const series = chart.addSeries({
        type: seriesTypeMap[ind.type],
        ...(ind.options || defaultSeriesOptions[ind.type]),
      });
      series.setData(ind.data);
      return series;
    });

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
  }, [chartType, data, indicators, width, height, theme]); // rebuild chart when theme changes

  // Update main series
  useEffect(() => {
    mainSeriesRef.current?.setData(data);
  }, [data]);

  // Update indicators
  useEffect(() => {
    indicatorRefs.current.forEach((series, idx) => {
      series.setData(indicators[idx]?.data || []);
    });
  }, [indicators]);

  return <div ref={chartRef} className="w-full h-full" />;
};
