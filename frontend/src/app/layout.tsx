import { AuthProvider } from '@/hooks/useAuth';
import './globals.scss';
import type { Metadata } from 'next'

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
        <AuthProvider> {/* Wrap application */}
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}