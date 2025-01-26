// src/providers/QueryProvider.tsx
'use client'; // สำคัญสำหรับ Client Components
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 นาที (ตั้งเวลาที่ข้อมูลถือว่าเก่า)
      cacheTime: 10 * 60 * 1000, // 10 นาที (ตั้งเวลาที่ข้อมูลอยู่ใน cache)
      refetchOnWindowFocus: false, // ไม่ refetch เมื่อ focus window กลับมา
      retry: 3, // จำนวนครั้งที่ retry เมื่อ fetch ล้มเหลว
    },
  },
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};