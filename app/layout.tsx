import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Only Gifts — A birthday gift list for the people who actually like you',
  description:
    'Make a gift list for your birthday. Drop the link in your Instagram bio. Friends claim items, chip in on big ones, or send cash. Simple as that.',
  metadataBase: new URL('https://onlygifts.app'),
  openGraph: {
    title: 'Only Gifts — your birthday wishlist, in your IG bio',
    description:
      'A gift list for the people who actually like you. Drop it in your IG bio. Done.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FAF8F5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
