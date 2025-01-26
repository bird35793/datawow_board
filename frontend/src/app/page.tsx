import { API_BASE_URL } from '@/config';
import { ResponseSelectPostDto } from '@/types';
import PostCard from '@/components/PostCard';

async function getPosts() {
  const res = await fetch(`${API_BASE_URL}/posts`);
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const posts: ResponseSelectPostDto[] = await res.json();
  return posts;
}

export default async function Home() {
    const posts = await getPosts();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}