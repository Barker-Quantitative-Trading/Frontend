"use client";

import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "../theme/theme";
import Sidebar from "@/components/Sidebar";

export default function Client({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <html lang="en">
      <body>
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
              <CssBaseline />
              <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />
              <main>{children}</main>
          </ThemeProvider>
      </body>
    </html>
  );
}
