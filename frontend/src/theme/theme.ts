// theme.ts
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
    background: { default: "#f9f9f9", paper: "#ffffff" },
    text: { primary: "#171717", secondary: "#555555" },
  },
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#ce93d8" },
    background: { default: "#0f111a", paper: "#0f111a" }, // 0f111a 121212 1e1e1e
    text: { primary: "#ffffff", secondary: "#bbbbbb" },
  },
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",
  },
});
