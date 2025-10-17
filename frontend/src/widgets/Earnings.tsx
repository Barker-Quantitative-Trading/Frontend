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
}

const EarningsWidget: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState<Earnings[]>([]);

  const fetchEarnings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/earnings");
      setEarnings([...res.data].reverse());
    } catch (err) {
      console.error("Error fetching earnings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upcoming Earnings
          </Typography>

          {loading ? (
            <Grid container justifyContent="center" style={{ padding: 50 }}>
              <CircularProgress />
            </Grid>
          ) : (
            <>
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
                <div style={{ maxHeight: 500, overflowY: "auto" }}>
                  {earnings.map((earn, idx) => (
                    <Typography key={idx}>
                      {earn.symbol} — {earn.date}
                    </Typography>
                  ))}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EarningsWidget;
