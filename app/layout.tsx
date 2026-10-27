import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { STYLE_BOOTSTRAP } from '@/lib/style-registry'
import { GENOME_BOOTSTRAP } from '@/lib/genome/store'
import './globals.css'

export const metadata: Metadata = {
  title: 'OMNIFORGE — Design Family Engine',
  description: 'Browse five design families, product archetypes, and tiered packages — then preview any offering as a live presentation before you buy.',
  generator: 'OMNIFORGE',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* One URL, all engines + genome voices — obsidian (Fraunces/Inter/Plex Mono),
            nocturne (Cormorant Garamond/Plex Sans), midhigh (Cormorant/Inter/JetBrains),
            agencyos (Space Grotesk/DM Sans/JetBrains), templateos (Syne/Manrope) — plus
            the genome high-contrast voice: Playfair Display. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;700&family=DM+Sans:wght@400;500;700&family=Syne:wght@400;600;700;800&family=Manrope:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        {/* Design-matrix bootstrap: set data-style + of-dark BEFORE first paint */}
        <script dangerouslySetInnerHTML={{ __html: STYLE_BOOTSTRAP }} />
        {/* Genome bootstrap: restore the voice switch pre-paint (dashboard fonts) */}
        <script dangerouslySetInnerHTML={{ __html: GENOME_BOOTSTRAP }} />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
