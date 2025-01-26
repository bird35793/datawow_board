// LoginForm.tsx (assuming this is a client component)
'use client'; // Add this directive if necessary

import LoginForm from '@/components/LoginForm';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient(); // Create a QueryClient instance

export default function LoginPage() {
  return (
    <QueryClientProvider client={queryClient}> {/* Wrap LoginForm here */}
      <LoginForm />
    </QueryClientProvider>
  );
}