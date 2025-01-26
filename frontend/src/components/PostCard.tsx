// src/components/PostCard.tsx
import Link from 'next/link';
import { ResponseSelectPostDto } from '@/types';

const PostCard = ({ post }: { post: ResponseSelectPostDto }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition duration-300 hover:scale-105">
      <Link href={`/post/${post.id}`} className="block">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">{post.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{post.content}</p> {/* แสดงเนื้อหาแบบย่อ */}
      </Link>
      <div className="mt-4 flex justify-between items-center">
      <p className='text-sm text-gray-500 dark:text-gray-400'>By : {post.authorDisplayName}</p>
      <p className='text-sm text-gray-500 dark:text-gray-400'>{post.createdAt.toString()}</p>
      </div>
    </div>
  );
};

export default PostCard;