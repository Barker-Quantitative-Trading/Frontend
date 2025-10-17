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

interface EarningsWidgetProps {
  empty: string;
}

const EarningsWidget: React.FC<EarningsWidgetProps> = () => {
  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState<Earnings[]>([]);

  // const getNext3Days = () => {
  //   const today = new Date();
  //   const dates: string[] = [];
  //   for (let i = 0; i < 3; i++) {
  //     const d = new Date(today);
  //     d.setDate(today.getDate() + i);
  //     dates.push(d.toISOString().split("T")[0]);
  //   }
  //   return dates;
  // };

  const fetchEarnings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/earnings");
      setEarnings(res.data);
    } catch (err) {
      console.error("Error fetching earnings:", err);
    } finally {
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
