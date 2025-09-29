"use client";

import IconButton from "@mui/material/IconButton";
import { SunIcon } from "@/components/icons/SunIcon";
import { MoonIcon } from "@/components/icons/MoonIcon";

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {
  return (
    <IconButton
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle-theme"
      color="inherit"
    >
      {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
    </IconButton>
  );
}
