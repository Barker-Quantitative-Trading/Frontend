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
} from "@mui/material";

interface NewsArticle {
  headline: string;
  url: string;
  source: string;
}

interface NewsWidgetProps {
  empty: string;
}

const NewsWidget: React.FC<NewsWidgetProps> = () => {
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState<NewsArticle[]>([]);

    const fetchNews = async () => {
      try {
        const res = await axios.get("/api/news");
        setNews(res.data);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchNews();
    }, []);

  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Market News
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
                sx={{ mb: 1 }}
              >
                Refresh
              </Button>
              <Divider sx={{ mb: 1 }} />
              {news.length === 0 ? (
                <Typography>No news available</Typography>
              ) : (
                <div style={{ maxHeight: 500, overflowY: "auto" }}>
                  {news.map((article, idx) => (
                    <Typography key={idx} sx={{ mb: 1 }}>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "#1976d2" }}
                      >
                        {article.headline}
                      </a>{" "}
                      — <strong>{article.source}</strong>
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

export default NewsWidget;
