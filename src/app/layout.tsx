import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OMNIFORGE — Design Family Engine",
    template: "%s · OMNIFORGE",
  },
  description:
    "A unified creation environment: browse design families, preview production-grade product templates, and launch websites and digital products with the same craft at every price tier.",
  applicationName: "OMNIFORGE",
  keywords: [
    "design families",
    "product templates",
    "website builder",
    "dashboard design",
    "SaaS templates",
    "OMNIFORGE",
  ],
  authors: [{ name: "OMNIFORGE" }],
  openGraph: {
    title: "OMNIFORGE — Design Family Engine",
    description:
      "Pick a design family. Preview every product we can build in it — with motion, device previews, and honest tier scoping.",
    siteName: "OMNIFORGE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OMNIFORGE — Design Family Engine",
    description:
      "Pick a design family. Preview every product we can build in it.",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} ${cormorant.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
