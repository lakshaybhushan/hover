import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

// Load Geist as a variable font
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "hover.",
  description:
    "A buttery smooth text hover effect using Motion and variable fonts. Made with v0.dev by Lakshay Bhushan :)",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Analytics />
      <body className={geist.className}>{children}</body>
    </html>
  );
}
