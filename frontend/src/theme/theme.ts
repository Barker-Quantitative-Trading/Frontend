// theme.ts
import { createTheme } from "@mui/material/styles";

// 1️⃣ Extend MUI Theme 
declare module '@mui/material/styles' {
  interface Theme {
    chart: {
      candleUp: string;
      candleDown: string;
      wickUp: string;
      wickDown: string;
      line: string;
      volume: string;
      grid: string;
      up: string;
      down: string;
      text: string;

      areaTop: string;
      areaBottom: string;
      baseLineColor: string;
      baselineTop: string;
      baselineBottom: string;
      bar: string;
      custom: string;
    };
  }
  interface ThemeOptions {
    chart?: {
      candleUp?: string;
      candleDown?: string;
      wickUp?: string;
      wickDown?: string;
      line?: string;
      volume?: string;
      grid?: string;
      up?: string;
      down?: string;
      text?: string;

      areaTop: string;
      areaBottom: string;
      baseLineColor: string;
      baselineTop: string;
      baselineBottom: string;
      bar: string;
      custom: string;
    };
  }
}

// Base colors for candles and charts
const candleUpColor = '#4fff4f';
const candleDownColor = '#ff4976';
const lineColor = '#2962FF';
const volumeColor = '#26a69a';
const areaTopColor = 'rgba(41, 98, 255, 0.4)';
const areaBottomColor = 'rgba(41, 98, 255, 0.05)';
const baselineTopColor = '#4caf50';
const baselineBottomColor = '#f44336';
const barColor = '#1976d2';
const customColor = '#ff9800';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
    background: { default: '#f9f9f9', paper: '#ffffff' },
    text: { primary: '#171717', secondary: '#555555' },
  },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  chart: {
    candleUp: candleUpColor,
    candleDown: candleDownColor,
    wickUp: candleUpColor,
    wickDown: candleDownColor,
    line: lineColor,
    volume: volumeColor,
    grid: '#ccc',
    up: '#2e7d32',
    down: '#c62828',
    text: '#171717',

    areaTop: areaTopColor,
    areaBottom: areaBottomColor,
    baseLineColor: '#B2B5BE',
    baselineTop: baselineTopColor,
    baselineBottom: baselineBottomColor,
    bar: barColor,
    custom: customColor,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#ce93d8' },
    background: { default: '#0f111a', paper: '#0f111a' },
    text: { primary: '#ffffff', secondary: '#bbbbbb' },
  },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  chart: {
    candleUp: candleUpColor,
    candleDown: candleDownColor,
    wickUp: candleUpColor,
    wickDown: candleDownColor,
    line: lineColor,
    volume: volumeColor,
    grid: '#2a2d3e',
    up: candleUpColor,
    down: candleDownColor,
    text: '#ffffff',
    areaTop: areaTopColor,
    areaBottom: areaBottomColor,
    baseLineColor: '#555',
    baselineTop: baselineTopColor,
    baselineBottom: baselineBottomColor,
    bar: barColor,
    custom: customColor,
  },
});