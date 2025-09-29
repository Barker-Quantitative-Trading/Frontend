"use client";

import React from "react";
import { Container, Card, CardContent, Typography, TextField, Button } from "@mui/material";

const Screener = () => {
  return (
    <Container className="p-4">
      <Typography variant="h4" className="mb-4">Screener</Typography>

      <Card className="p-4">
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextField label="Symbol" variant="outlined" fullWidth />
            <TextField label="Min Volume" variant="outlined" fullWidth />
            <TextField label="Max Volume" variant="outlined" fullWidth />
            <Button variant="contained" className="md:col-span-3 mt-2">Search</Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-4">
        <Typography variant="h6">Results</Typography>
        <div className="h-48 bg-gray-100 flex items-center justify-center mt-2">Screener Table Placeholder</div>
      </div>
    </Container>
  );
};

export default Screener;
