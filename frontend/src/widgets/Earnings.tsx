// widgets/Earnings.tsx
import React, { useEffect, useState } from "react";
import { Earnings } from "@/types/earnings"
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
  Button,
  List,
  Stack,
  Chip,
  ListItem,
} from "@mui/material";

const EarningsWidget: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState<Earnings[]>([]);

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

  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upcoming Earnings (Currently Limited)
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
                <Typography>No earnings in next 10 days</Typography>
              ) : (
                <div style={{ maxHeight: 500, overflowY: "auto" }}>
                  <List disablePadding>
                    {earnings.map((earn, idx) => (
                      <React.Fragment key={idx}>
                        <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", py: 1 }}>
                          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {earn.symbol}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {earn.date}
                            </Typography>
                            <Chip
                              label={`EPS Est: ${earn.epsEstimated !== undefined ? earn.epsEstimated.toFixed(4) : "N/A"}`}
                              size="small"
                              color="primary"
                            />
                            <Chip
                              label={`Rev Est: ${earn.revenueEstimated ? (earn.revenueEstimated / 1e6).toFixed(0) + "M" : "N/A"}`}
                              size="small"
                              color="secondary"
                            />
                          </Stack>
                        </ListItem>
                        {idx < earnings.length - 1 && <Divider component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
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
