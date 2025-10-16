// widgets/Earnings.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";

interface Earnings {
  symbol: string;
  date: string;
  eps?: number;
}

interface Props {
  empty: string;
}
const FMP_API_KEY = process.env.FMP_API_KEY;

const EarningsWidget: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState<Earnings[]>([]);

  const getNext3Days = () => {
    const today = new Date();
    const dates: string[] = [];
    for (let i = 0; i < 3; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
  };

  const fetchEarnings = async () => {
    setLoading(true);
    try {
      const dates = getNext3Days();

      // Fetch Earnings
      const earningsRequests = dates.map(date =>
        axios.get(
          `https://financialmodelingprep.com/api/v3/earning_calendar?from=${date}&to=${date}&apikey=${FMP_API_KEY}`
        )
      );
      const earningsResponses = await Promise.all(earningsRequests);
      const upcomingEarnings = earningsResponses.flatMap(res => res.data);
      setEarnings(upcomingEarnings);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching earnings:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  if (loading) {
    return (
      <Grid container justifyContent="center" style={{ padding: 50 }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upcoming Earnings
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={fetchEarnings}
            sx={{ mb: 1 }}
          >
            Refresh
        </Button>
          <Divider sx={{ mb: 1 }} />
          {earnings.length === 0 ? (
            <Typography>No earnings in next 3 days</Typography>
          ) : (
            earnings.map((earn, idx) => (
              <Typography key={idx}>
                {earn.symbol} — {earn.date} — EPS: {earn.eps ?? "N/A"}
              </Typography>
            ))
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EarningsWidget;
