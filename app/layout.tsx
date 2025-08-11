import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GenAI Newsletter - Your AI Intelligence Hub',
  description: 'Stay ahead with the latest in Generative AI, delivered with wit and wisdom',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
