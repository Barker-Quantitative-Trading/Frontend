"use client";

import React from "react";
import { Container, Card, CardContent, Typography } from "@mui/material";

const Ticker = () => {
  return (
    <Container className="p-4">
      <Typography variant="h4" className="mb-4">Ticker</Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <Typography variant="h6">AAPL</Typography>
            <div className="h-24 bg-gray-100 flex items-center justify-center">Price Chart</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">TSLA</Typography>
            <div className="h-24 bg-gray-100 flex items-center justify-center">Price Chart</div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Ticker;
