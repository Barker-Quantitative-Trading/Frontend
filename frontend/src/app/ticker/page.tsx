"use client";

import React, { useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Chart, ChartType } from "@/widgets/Chart";
import useMockSeriesData from "./mock/mockData";
import Toolbar from "./toolbar";

const TickerPage = () => {
  const [paused, setPaused] = useState(true);
  const [chartType, setChartType] = useState<ChartType>("Baseline");
  const {symbol, data, resetSeriesData } = useMockSeriesData(chartType, paused);

  const handleChartTypeChange = (newType: ChartType) => {
    setChartType(newType);
    resetSeriesData(newType);
  };

  // Compute last candle info for side panel
  const lastPoint = data[0]?.data?.at(-1);
  const ohlc =
    lastPoint && "open" in lastPoint
      ? {
          open: lastPoint.open,
          high: lastPoint.high,
          low: lastPoint.low,
          close: lastPoint.close,
        }
      : lastPoint && "value" in lastPoint
      ? {
          open: lastPoint.value,
          high: lastPoint.value,
          low: lastPoint.value,
          close: lastPoint.value,
        }
      : { open: 0, high: 0, low: 0, close: 0 };

  return (
    <div style={{ display: "flex", minHeight: "100vh"}}>
      {/* Main content */}
      <div style={{ flex: 1, padding: 16 }}>
        <Grid container spacing={2} margin={2}>
          <Toolbar
            paused={paused}
            onTogglePause={() => setPaused(!paused)}
            chartType={chartType}
            onChangeChartType={handleChartTypeChange}
            symbol={symbol}
          />
          {/* Chart */}
          <Grid item>
            <Chart width={1000} height={600} data={data[0]?.data ?? []} chartType={chartType}/>
          </Grid>

          {/* Side Info Panel */}
          <Grid item xs={12} md={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Last Point Info
                </Typography>
                {ohlc ? (
                  <>
                    <Typography>Open: {ohlc.open.toFixed(2)}</Typography>
                    <Typography>High: {ohlc.high.toFixed(2)}</Typography>
                    <Typography>Low: {ohlc.low.toFixed(2)}</Typography>
                    <Typography>Close: {ohlc.close.toFixed(2)}</Typography>
                  </>
                ) : (
                  <Typography>No OHLC Data</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TickerPage;
