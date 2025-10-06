"use client";

import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { Chart } from "@/widgets/Chart";
import useDynamicCandles from "./dynamicCandles";

const TickerPage = () => {
  const [paused, setPaused] = useState(false); // pause state
  const candles = useDynamicCandles(paused);   // pass pause to hook
  const symbol = "Test";
  
  // Compute last candle info for side panel
  const last = candles[candles.length - 1];
  const ohlc = last
    ? { open: last.open, high: last.high, low: last.low, close: last.close }
    : { open: 0, high: 0, low: 0, close: 0 };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0f111a" }}>
      {/* Main content */}
      <div style={{ flex: 1, padding: 16 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h4" color="white" gutterBottom>
              Ticker: {symbol}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button
              variant="contained"
              color={paused ? "success" : "error"}
              onClick={() => setPaused(!paused)}
            >
              {paused ? "Resume" : "Pause"}
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {/* Chart */}
          <Grid item xs={12} md={6}>
            <Chart width={800} height={400} candles={candles} />
          </Grid>

          {/* Side Info Panel */}
          <Grid item xs={12} md={2}>
            <Card sx={{ backgroundColor: "#1f2130" }}>
              <CardContent>
                <Typography variant="h6" color="white" gutterBottom>
                  Last Candle Info
                </Typography>
                <Typography color="white">Open: {ohlc.open.toFixed(2)}</Typography>
                <Typography color="white">High: {ohlc.high.toFixed(2)}</Typography>
                <Typography color="white">Low: {ohlc.low.toFixed(2)}</Typography>
                <Typography color="white">Close: {ohlc.close.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TickerPage;
