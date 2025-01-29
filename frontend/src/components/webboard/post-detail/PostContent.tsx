import { IPost } from '@/types/post';
import dayjs from 'dayjs'; // ใช้ dayjs สำหรับจัดการวันที่

interface PostContentProps {
  post: IPost;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <div className="prose lg:prose-xl max-w-3xl mx-auto p-4"> {/* ใช้ prose class ของ Tailwind */}
      <h1 className="text-3xl">{post.title}</h1>
      <div className="flex items-center justify-between text-gray-500 mt-4 text-xs">
        <p>โพสต์โดย {post.author?.displayName || 'ไม่ระบุ'} </p>
        <p>{dayjs(post.createdAt).format('DD MMM YYYY')}</p> {/* Format วันที่ */}
      </div>
      <hr className="my-4" />
      <div dangerouslySetInnerHTML={{ __html: post.content }} /> {/* แสดงเนื้อหา HTML */}
    </div>
  );
};

export default PostContent;