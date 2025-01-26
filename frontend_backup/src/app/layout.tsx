// src/app/layout.tsx
'use client';

import type { Metadata } from 'next';
import { Prompt } from 'next/font/google';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/query-client';
import Header from '../components/Header';
import Footer from '../components/Footer';

const prompt = Prompt({ subsets: ['thai'], weight: '400' });

// Move metadata export outside RootLayout
// export const metadata: Metadata = {
//   title: 'Datawow Webboard',
//   description: 'Webboard by Datawow',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={prompt.className}>
        <QueryClientProvider client={queryClient}>
          <Header />
          <main className="container mx-auto py-8">
            {children}
          </main>
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
}