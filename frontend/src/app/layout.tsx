import type { Metadata } from "next";
import "../styles/globals.css";

import Client from "./client";
import EmotionProvider from '../theme/EmotionProvider';

export const metadata: Metadata = {
  title: "Backtesting Platform",
  description: "Backtesting system for Barker Quantitative Trading Club",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return ( 
    <html lang="en">
      <body>
        <EmotionProvider>
          <Client>{children}</Client>
        </EmotionProvider>
      </body>
    </html>
  );
}
