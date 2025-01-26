import type { Metadata } from 'next'
import './globals.scss'
import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'Datawow Webboard',
  description: 'Webboard application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      {children}
      </body>
    </html>
  )
}