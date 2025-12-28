import type React from "react";
import type { Metadata, Viewport } from "next";
import { Antonio, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";
import { GL } from "@/components/gl";

const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Omar Khalid — Creative Developer & Designer",
  description:
    "Award-winning creative portfolio showcasing high-end digital experiences. Senior Frontend Engineer specializing in motion design, React, Next.js, and creative interaction.",
  keywords: [
    "Creative Developer",
    "Designer",
    "Frontend Engineer",
    "Portfolio",
    "Motion Design",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Omar Khalid" }],
  creator: "Omar Khalid",
  publisher: "Omar Khalid",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Omar Khalid — Creative Developer & Designer",
    description:
      "Crafting high-end digital experiences where motion meets strategy.",
    siteName: "Omar Khalid Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Khalid — Creative Developer & Designer",
    description:
      "Crafting high-end digital experiences where motion meets strategy.",
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9F4EC" },
    { media: "(prefers-color-scheme: dark)", color: "#212121" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${antonio.variable} ${inter.variable}`}>
      <body className="font-sans antialiased md:cursor-none">
        <div id="webgl-root">
          <GL />
        </div>
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
