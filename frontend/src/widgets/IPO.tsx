// widgets/IPO.tsx
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

interface IPO {
  company: string;
  symbol: string;
  date: string;
}

interface IPOWidgetProps {
  empty: string;
}

const FMP_API_KEY = process.env.FMP_API_KEY;

const IPOWidget: React.FC<IPOWidgetProps> = () => {
  const [loading, setLoading] = useState(true);
  const [ipos, setIpos] = useState<IPO[]>([]);

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

  const fetchIPOs = async () => {
    setLoading(true);
    try {
      const dates = getNext3Days();

      // Fetch IPOs
      const ipoRequests = dates.map(date =>
        axios.get(
          `https://financialmodelingprep.com/api/v3/ipo-calendar?from=${date}&to=${date}&apikey=${FMP_API_KEY}`
        )
      );
      const ipoResponses = await Promise.all(ipoRequests);
      const upcomingIPOs = ipoResponses.flatMap(res => res.data);
      setIpos(upcomingIPOs);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching IPOs:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIPOs();
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
            Upcoming IPOs
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={fetchIPOs}
            sx={{ mb: 1 }}
          >
            Refresh
          </Button>
          <Divider sx={{ mb: 1 }} />
          {ipos.length === 0 ? (
            <Typography>No IPOs in next 3 days</Typography>
          ) : (
            ipos.map((ipo, idx) => (
              <Typography key={idx}>
                {ipo.company} ({ipo.symbol}) — {ipo.date}
              </Typography>
            ))
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default IPOWidget;
