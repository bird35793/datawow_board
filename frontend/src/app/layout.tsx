import { AuthProvider } from '@/hooks/useAuth';
import './globals.scss';
import type { Metadata } from 'next'
import { QueryProvider } from '@/providers/QueryProvider';
import Layout from '@/components/Layout';

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
        {/* <AuthProvider>
          {children}
        </AuthProvider> */}
        <QueryProvider> {/* Wrap ด้วย QueryProvider */}
          <Layout>{children}</Layout>
        </QueryProvider>
        {children}
      </body>
    </html>
  )
}