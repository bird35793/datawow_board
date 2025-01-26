import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // ป้องกันการ refetch เมื่อ focus ที่ window
      retry: false, // ไม่ retry เมื่อ query fail
    },
  },
});