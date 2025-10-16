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

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

const NewsWidget: React.FC<NewsWidgetProps> = () => {
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState<NewsArticle[]>([]);

    const fetchNews = async () => {
        try {
        // Fetch Market News
        const newsRes = await axios.get(
            `https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_API_KEY}`
        );
        setNews(newsRes.data.slice(0, 10)); // Top 10 news

        setLoading(false);
        } catch (err) {
        console.error("Error fetching news:", err);
        setLoading(false);
        }
    };

    useEffect(() => {
      fetchNews();
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
            Market News
            </Typography>
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
            <div style={{ maxHeight: 400, overflowY: "auto" }}>
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
        </CardContent>
      </Card>
    </Grid>
  );
};

export default NewsWidget;
