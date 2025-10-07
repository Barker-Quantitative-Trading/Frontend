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
    };
  }
}

// Base colors for candles and charts
const candleUpColor = '#4fff4f';
const candleDownColor = '#ff4976';
const lineColor = '#2962FF';
const volumeColor = '#26a69a';

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
  },
});