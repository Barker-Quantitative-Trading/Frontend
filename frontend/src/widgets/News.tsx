// widgets/NewsWidget.tsx
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
  List,
  ListItem,
  Chip,
  Stack,
} from "@mui/material";

import { NewsArticle } from "@/types/news";

const NewsWidget: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState<NewsArticle[]>([]);

    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/news");
        setNews(res.data ?? []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchNews();
    }, []);

  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            General Market News
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
                onClick={fetchNews}
                disabled={loading}
                sx={{ mb: 1 }}
              >
                Refresh
              </Button>
              <Divider sx={{ mb: 1 }} />
              {news.length === 0 ? (
                <Typography>No news available</Typography>
              ) : (
                <div style={{ maxHeight: 500, overflowY: "auto" }}>
                  <List disablePadding>
                    {news.map((article, idx) => (
                      <React.Fragment key={idx}>
                        <ListItem
                          sx={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                            py: 1,
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            flexWrap="wrap"
                          >
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: "none" }}
                            >
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {article.headline}
                              </Typography>
                            </a>
                          </Stack>
                          <Chip
                            label={article.source}
                            size="small"
                            color="default"
                          />
                        </ListItem>
                        {idx < news.length - 1 && <Divider component="li" />}
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

export default NewsWidget;
