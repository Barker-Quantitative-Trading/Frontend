"use client";

import React from "react";
import { Container, Card, CardContent, Typography, Button, TextField } from "@mui/material";

const Account = () => {
  return (
    <Container className="p-4">
      <Typography variant="h4" className="mb-4">Account</Typography>

      <Card className="p-4">
        <CardContent>
          <Typography variant="h6">Profile Info</Typography>
          <form className="flex flex-col gap-4 mt-4">
            <TextField label="Username" variant="outlined" fullWidth />
            <TextField label="Email" variant="outlined" fullWidth />
            <Button variant="contained" color="primary">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Account;
