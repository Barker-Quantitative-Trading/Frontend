"use client";

import React, { useState } from "react";
import Chart from "@/widgets/Chart";
import News from "../../widgets/News";
import Orderbook from "../../widgets/Orderbook";

import {
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

type BacktestProps = { symbol: string; start: string; end: string };

function BacktestControls({ onRun }: { onRun: (props: BacktestProps) => void }) {
  const [symbol, setSymbol] = useState<string>("AAPL");
  const [start, setStart] = useState<Dayjs | null>(dayjs("2020-01-01"));
  const [end, setEnd] = useState<Dayjs | null>(dayjs("2023-01-01"));

  const handleRun = () => {
    if (!symbol || !start || !end || start.isAfter(end)) {
      alert("Please enter a valid symbol and date range (start <= end).");
      return;
    }
    onRun({ symbol, start: start.format("YYYY-MM-DD"), end: end.format("YYYY-MM-DD") });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
        <TextField
          label="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          size="small"
        />
        <DatePicker
          label="Start"
          value={start}
          onChange={(newVal) => setStart(newVal)}
          slotProps={{ textField: { size: "small" } }}
        />
        <DatePicker
          label="End"
          value={end}
          onChange={(newVal) => setEnd(newVal)}
          slotProps={{ textField: { size: "small" } }}
        />
        <Button variant="contained" color="primary" onClick={handleRun}>
          Run Backtest
        </Button>
      </Stack>
    </LocalizationProvider>
  );
}

function BacktestSummary({
  backtest,
}: {
  backtest: BacktestProps & { resultSummary: { pnl: number } };
}) {
  return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Backtest Summary
        </Typography>
        <Typography>PnL: {backtest.resultSummary.pnl}</Typography>
        <Typography>
          Period: {backtest.start} → {backtest.end}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  type BacktestResult = BacktestProps & { resultSummary: { pnl: number } };
  const [backtest, setBacktest] = useState<BacktestResult | null>(null);

  const handleRun = (opts: BacktestProps) => {
    setBacktest({ ...opts, resultSummary: { pnl: Math.round((Math.random() - 0.5) * 10000) } });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={4}
      >
        <div>
          <Typography variant="h4" gutterBottom>
            Backtest Reports
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Run and inspect your strategies against historical data
          </Typography>
        </div>
        <BacktestControls onRun={handleRun} />
      </Stack>

      {/* Main content */}
      <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
        {/* Chart & Backtest summary */}
        <Card sx={{ flex: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Price Chart
            </Typography>
            {/* <Chart symbol={backtest?.symbol ?? "AAPL"} /> */}
            {backtest && <BacktestSummary backtest={backtest} />}
          </CardContent>
        </Card>

        {/* Sidebar widgets */}
        <Stack spacing={4} sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                News
              </Typography>
              <News />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Orderbook
              </Typography>
              <Orderbook />
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </Container>
  );
}
