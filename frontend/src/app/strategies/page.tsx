"use client";

import React from "react";
import { Container, Card, CardContent, Typography } from "@mui/material";

const Strategies = () => {
  return (
    <Container className="p-4">
      <Typography variant="h4" className="mb-4">Strategies</Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <Typography variant="h6">Strategy 1</Typography>
            <div className="h-24 bg-gray-100 flex items-center justify-center">Preview</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Strategy 2</Typography>
            <div className="h-24 bg-gray-100 flex items-center justify-center">Preview</div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Strategies;
