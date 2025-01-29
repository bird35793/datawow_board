import { IPost } from '@/types/post';

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchPosts = async (): Promise<IPost[]> => {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
};

export const fetchPost = async (id: number): Promise<IPost> => {
  const res = await fetch(`${API_URL}/posts/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json();
};