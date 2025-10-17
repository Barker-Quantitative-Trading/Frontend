"use client";

import NewsWidget from "@/widgets/News";
import EarningsWidget from "@/widgets/earnings/Earnings";
import React from "react";
import {
  Grid,
} from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", padding: 16 }}>
      <Grid container spacing={3}>
        <NewsWidget></NewsWidget>
        <EarningsWidget></EarningsWidget>
      </Grid>
    </div>
  );
};

export default Dashboard;
