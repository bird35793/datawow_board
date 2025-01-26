// LoginForm.tsx
'use client';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { API_BASE_URL } from '@/config';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

// Interfaces (คงไว้เหมือนเดิม)
interface UserDtoResponse {
  id: number;
  email: string;
  displayName: string;
}

interface LoginResponse {
  access_token: string;
  user: UserDtoResponse;
}

interface LoginData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const mutation = useMutation<LoginResponse, Error, LoginData>( // กำหนด Error type
    async (data: LoginData) => {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData?.message || 'Login failed'; // ป้องกัน error ถ้าไม่มี message ใน response
        throw new Error(errorMessage); // โยน Error ที่มี message
      }

      return res.json();
    },
    {
      onSuccess: (data: LoginResponse) => {
        login({ access_token: data.access_token, user: data.user });
        router.push('/');
      },
      onError: (error: Error) => {
        console.error("Login error:", error); // Log error เพื่อ debug
        alert(error.message); // แสดงข้อความ error ให้ผู้ใช้ (ควรปรับปรุง UI ใน production)
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await mutation.mutateAsync({ username, password });
    } catch (error) {
        console.error("Mutation error:", error);
        alert((error as Error).message);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="mt-1 p-2 border rounded-md w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 p-2 border rounded-md w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50"
        >
          {mutation.isLoading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;