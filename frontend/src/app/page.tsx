// src/app/page.tsx
'use client';
import { API_BASE_URL } from '@/config';
import { ResponseSelectPostDto } from '@/types';
import PostCard from '@/components/PostCard';
import { useQuery } from 'react-query';
import { QueryProvider } from '@/providers/QueryProvider'; // Import QueryProvider ของคุณ

const getPosts = async () => {
  const res = await fetch(`${API_BASE_URL}/posts`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json() as Promise<ResponseSelectPostDto[]>;
};

export default function Home() {
  return ( // Wrap component ด้วย QueryProvider
    <QueryProvider>
      <HomeContent />
    </QueryProvider>
  );
}

const HomeContent = () => {
    const { isLoading, error, data: posts } = useQuery('posts', getPosts);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;
  
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  };