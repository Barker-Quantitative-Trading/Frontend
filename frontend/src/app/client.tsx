"use client";

import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "../theme/theme";
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });

export default function Client({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // only render Sidebar after client hydration
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {mounted && (
        <>
          <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />
          <main>{children}</main>
        </>
      )}
    </ThemeProvider>
  );
}
