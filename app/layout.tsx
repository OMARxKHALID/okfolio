import type React from "react";
import type { Metadata } from "next";
import type { Viewport } from "next";
import { Antonio, Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";
import { ConditionalGL } from "@/components/conditional-gl";

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
  title: "Aroojaatir — Creative Designer & Animator",
  description:
    "Award-winning creative portfolio showcasing high-end digital experiences. Creative Designer & Animator specializing in motion design, design, and creative interaction.",
  keywords: [
    "Creative Designer",
    "Animator",
    "Designer",
    "Animator",
    "Portfolio",
    "Motion Design",
    "Design",
    "Animation",
  ],
  authors: [{ name: "Aroojaatir" }],
  creator: "Aroojaatir",
  publisher: "Aroojaatir",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Aroojaatir — Creative Designer & Animator",
    description:
      "Crafting high-end digital experiences where motion meets strategy.",
    siteName: "Aroojaatir Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aroojaatir — Creative Designer & Animator",
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
        <ConditionalGL />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
