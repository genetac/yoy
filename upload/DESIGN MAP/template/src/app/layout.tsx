import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const display = Archivo({
  variable: "--font-display",
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const sans = IBM_Plex_Sans({
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OMNIFORGE — Template Packs, Toolkits, Notion Systems, Assessments & Website Kits",
  description:
    "A marketplace of finished digital products. Every bundle is promise-accurate, every demo is playable, every download is real.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${mono.variable} ${sans.variable} ${serif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
