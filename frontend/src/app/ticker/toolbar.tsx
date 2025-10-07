"use client";

import React, { useState } from "react";
import { Divider, Grid, Button, ToggleButtonGroup, ToggleButton, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ChartType } from "@/widgets/Chart";

interface ChartToolbarProps {
  paused: boolean;
  onTogglePause: () => void;
  chartType: ChartType;
  onChangeChartType: (type: ChartType) => void;
  symbol?: string;
}

const Toolbar: React.FC<ChartToolbarProps> = ({
  paused,
  onTogglePause,
  chartType,
  onChangeChartType,
  symbol,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePauseClick = () => {
    onTogglePause();
    handleMenuClose();
  };

  return (
    <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
      {/* Symbol / Title */}
      {symbol && (
        <Grid item xs={6} sm={4}>
          <Typography variant="h5">{symbol}</Typography>
        </Grid>
      )}

      {/* More Menu Button on Right */}
      <Grid item xs={12} sm={8}>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={(e, value) => value && onChangeChartType(value)}
          size="small"
        >
          <ToggleButton value="Bar">Bar</ToggleButton>
          <ToggleButton value="Candlestick">Candlestick</ToggleButton>
          <ToggleButton value="Line">Line</ToggleButton>
          <ToggleButton value="Area">Area</ToggleButton>
          <ToggleButton value="Baseline">Baseline</ToggleButton>
          <ToggleButton value="Histogram">Histogram</ToggleButton>
        </ToggleButtonGroup>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
        <MenuItem>
            <Button
                variant="contained"
                color={paused ? "success" : "error"}
                onClick={handlePauseClick}
                fullWidth
            >
                {paused ? "Start Mock" : "Pause Mock"}
            </Button>
        </MenuItem>

          <Divider />

        {(["Bar", "Candlestick", "Line", "Area", "Baseline", "Histogram"] as ChartType[]).map(
            (type) => (
              <MenuItem
                key={type}
                selected={chartType === type}
                onClick={() => {
                  onChangeChartType(type);
                  handleMenuClose();
                }}
              >
                {type}
              </MenuItem>
            )
          )}
          {/* Add more menu items here if needed */}
        </Menu>
      </Grid>
    </Grid>
  );
};

export default Toolbar;
