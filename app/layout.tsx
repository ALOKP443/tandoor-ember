import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', display: 'swap' })

export const metadata: Metadata = {
  title: 'Tandoor & Ember — Tandoor-fired neighborhood kitchen',
  description: 'Tandoor-fired, slow-simmered, always neighborhood. Tandoor & Ember in Hauz Khas Village, New Delhi.',
  generator: 'v0.app',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#211b17' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geist.variable} ${geistMono.variable} ${cormorant.variable} bg-ink`}><body>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
