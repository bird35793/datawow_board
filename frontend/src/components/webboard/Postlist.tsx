import { IPost } from '@/types/post';
import Link from 'next/link';
import dayjs from 'dayjs'; // ใช้ dayjs สำหรับจัดการวันที่

interface PostListProps {
  posts: IPost[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="w-[50%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
          <th className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
          <th className="w-[30%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post By</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post: IPost) => (
          <tr key={post.id}>
            <td className="w-[50%] px-6 py-4 whitespace-nowrap">
              <Link href={`/webboard/${post.id}`} className="font-medium text-gray-900 hover:underline">
                {post.title}
              </Link>
            </td>
            <td className="w-[20%] px-6 py-4 whitespace-nowrap text-center text-gray-900">
              {post.commentCount ?? 0}
            </td>
            <td className="w-[30%] px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {post.author.displayName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {dayjs(post.createdAt).format('DD MMM YYYY HH:mm')}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostList;