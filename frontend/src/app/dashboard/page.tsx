"use client";

import React from "react";
import { Container, Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Container className="p-4">
      <Typography variant="h4" className="mb-4">Dashboard</Typography>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <Typography variant="h6">Chart</Typography>
            <div className="h-48 bg-gray-100 flex items-center justify-center">Chart Placeholder</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">News</Typography>
            <div className="h-48 bg-gray-100 flex items-center justify-center">News Placeholder</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Orderbook</Typography>
            <div className="h-48 bg-gray-100 flex items-center justify-center">Orderbook Placeholder</div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Dashboard;
