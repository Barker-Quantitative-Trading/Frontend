'use client';
import React, { useEffect, useRef, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  createChart,
  ColorType,
  SeriesOptionsMap,
  SeriesOptionsCommon,
  IChartApi,
  ISeriesApi,
  LineStyle,
  LineWidth,
  LineType,
  PriceFormat,
  PriceLineSource,
  LastPriceAnimationMode,
  BaseValueType,

  CandlestickSeries,
  LineSeries,
  AreaSeries,
  BaselineSeries,
  HistogramSeries,
  BarSeries,

  SeriesDataItemTypeMap,
  Time,
} from 'lightweight-charts';

export type ChartType = keyof SeriesDataItemTypeMap
export interface SeriesData<T extends ChartType = ChartType> {
  type: T;
  data: SeriesDataItemTypeMap<Time>[T][];
}

type SeriesApiMap = {
  [x in ChartType]: ISeriesApi<x>;
};

const seriesTypeMap: {
  Bar: typeof BarSeries;
  Candlestick: typeof CandlestickSeries;
  Area: typeof AreaSeries;
  Baseline: typeof BaselineSeries;
  Line: typeof LineSeries;
  Histogram: typeof HistogramSeries;
  Custom: undefined;
} = {
  Bar: BarSeries,
  Candlestick: CandlestickSeries,
  Area: AreaSeries,
  Baseline: BaselineSeries,
  Line: LineSeries,
  Histogram: HistogramSeries,
  Custom: undefined,
};


export interface Indicator {
  type: ChartType;
  data: SeriesDataItemTypeMap<Time>[ChartType][];
}

export interface ChartWidgetProps {
  width?: number;
  height?: number;
  data: SeriesDataItemTypeMap<Time>[ChartType][];
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

  const commonOptions: SeriesOptionsCommon = useMemo(() => ({
    lastValueVisible: true,
    title: '',
    priceScaleId: 'right',
    visible: true,
    priceLineVisible: true,
    priceLineSource: PriceLineSource.LastBar,
    priceLineWidth: 1 as LineWidth,
    priceLineColor:  theme.palette.background.default,
    priceLineStyle: LineStyle.Dashed,
    priceFormat: { type: 'price', precision: 2, minMove: 0.01 } as PriceFormat,
    baseLineVisible: true,
    baseLineColor: theme.palette.mode === "dark" ? '#555' : '#B2B5BE',
    baseLineWidth: 1 as LineWidth,
    baseLineStyle: LineStyle.Solid,
  }), [theme]);

 const defaultSeriesOptions: SeriesOptionsMap = useMemo(() => ({
    Candlestick: {
      upColor: theme.chart.candleUp,
      downColor: theme.chart.candleDown,
      wickVisible: true,
      wickColor: theme.chart.wickUp,
      wickUpColor: theme.chart.wickUp,
      wickDownColor: theme.chart.wickDown,
      borderVisible: false,
      borderColor: theme.chart.candleUp,
      borderUpColor: theme.chart.candleUp,
      borderDownColor: theme.chart.candleDown,
      ...commonOptions,
    }, 
    Line: {
      color: theme.chart.line,
      lineStyle: LineStyle.Solid,
      lineWidth: 2 as LineWidth,
      lineType: LineType.Simple,
      lineVisible: true,
      pointMarkersVisible: false,
      pointMarkersRadius: undefined,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      crosshairMarkerBorderColor: '',
      crosshairMarkerBackgroundColor: '',
      crosshairMarkerBorderWidth: 2,
      lastPriceAnimation: LastPriceAnimationMode.Disabled,
      ...commonOptions,
    },
    Area: {
      topColor: theme.chart.areaTop,
      bottomColor: theme.chart.areaBottom,
      relativeGradient: true,
      invertFilledArea: false,
      lineColor: theme.chart.line,
      lineStyle: LineStyle.Solid,
      lineWidth: 3 as LineWidth,
      lineType: LineType.Simple,
      lineVisible: true,
      pointMarkersVisible: false,
      pointMarkersRadius: undefined,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      crosshairMarkerBorderColor: '',
      crosshairMarkerBackgroundColor: '',
      crosshairMarkerBorderWidth: 2,
      lastPriceAnimation: LastPriceAnimationMode.Disabled,
      ...commonOptions,
    },
    Histogram: {
      color: theme.chart.volume,
      base: 0,
      ...commonOptions,
    },
    Baseline: {
      baseValue: {type: 'price', price: 0} as BaseValueType,
      relativeGradient: false,
      topFillColor1: theme.chart.baselineTop,
      topFillColor2: theme.chart.baselineTop,
      topLineColor: theme.chart.line,
      bottomFillColor1: theme.chart.baselineBottom,
      bottomFillColor2: theme.chart.baselineBottom,
      bottomLineColor: theme.chart.line,
      lineWidth: 3 as LineWidth,
      lineStyle: LineStyle.Solid,
      lineType: LineType.Simple,
      lineVisible: true,
      pointMarkersVisible: false,
      pointMarkersRadius: undefined,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      crosshairMarkerBorderColor: '',
      crosshairMarkerBackgroundColor: '',
      crosshairMarkerBorderWidth: 2,
      lastPriceAnimation: LastPriceAnimationMode.Disabled,
      ...commonOptions,
    },
    Bar: {
      upColor: theme.chart.candleUp,
      downColor: theme.chart.candleDown,
      openVisible: true,
      thinBars: true,
      ...commonOptions,
    },
    Custom: {
      color: theme.chart.custom,
      ...commonOptions,
    },
  }), [theme, commonOptions]);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = createChart(chartRef.current, {
      width,
      height,
      autoSize: false,
      layout: {
        background: { type: ColorType.Solid, color: theme.palette.background.default },
        textColor: theme.chart.text,
      },
      crosshair: { mode: 1 },
      grid: {
        vertLines: { color: theme.chart.grid },
        horzLines: { color: theme.chart.grid },
      },
      addDefaultPane: true,
    });
    chartInstance.current = chart;

    // Main series
      const mainSeries = chart.addSeries(
        seriesTypeMap[chartType]!,
        defaultSeriesOptions[chartType],
      ) as SeriesApiMap[typeof chartType];
      mainSeries.setData(data);
      mainSeriesRef.current = mainSeries;

    // Indicators
    if (indicators) {
      indicatorRefs.current = indicators.map((ind) => {
        const series = chart.addSeries(
          seriesTypeMap[ind.type]!,
          defaultSeriesOptions[ind.type],
        ) as SeriesApiMap[typeof chartType];
        series.setData(ind.data);
        return series;
      });
    }

    // Remove the TradingView logo
    const logo = document.getElementById("tv-attr-logo");
    if (logo) {
      logo.remove();
    }
    
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
  }, [chartType, data, indicators, width, height, theme, defaultSeriesOptions]);

  useEffect(() => {
    if (!mainSeriesRef.current) return;
    mainSeriesRef.current.setData(data);
  }, [data, chartType]);


  // Update indicators
  useEffect(() => {
    if (indicators && !indicatorRefs.current.length) return;

    indicatorRefs.current.forEach((series, idx) => {
      const ind = indicators?.[idx];
      if (!ind) return;
      series.setData(ind.data);
    });
  }, [indicators]);

  return <div ref={chartRef} className="w-full h-full" />;
};
