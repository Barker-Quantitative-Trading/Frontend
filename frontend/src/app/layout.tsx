import type { Metadata } from "next";
import "../styles/globals.css";

import Client from "./client";

export const metadata: Metadata = {
  title: "Backtesting Platform",
  description: "Backtesting system for Barker Quantitative Trading Club",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <Client>{children}</Client>;
}
