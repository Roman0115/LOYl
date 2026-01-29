import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Coming Soon - Unified Digital Ecosystem',
  description: 'We are creating a unified digital ecosystem. Stay tuned for something extraordinary.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-x-hidden">{children}</body>
    </html>
  )
}
