'use client';

import { useQuery } from '@tanstack/react-query'; 
import { fetchPost } from '@/services/postServices'; // Function สำหรับเรียก API Post Detail
import { useParams } from 'next/navigation';
import PostContent from '@/components/webboard/post-detail/PostContent';
import CommentSection from '@/components/webboard/post-detail/CommentSection';

interface PostDetailPageProps {
  params: { id: string };
}

const PostDetailPage: React.FC<PostDetailPageProps> = () => {
  const params = useParams();
  const postId = params.id ? +params.id : 0; // Convert string to number if defined

  const { isLoading, error, data: post } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return <div>กำลังโหลด...</div>;
  }

  if (error) {
    return <div>เกิดข้อผิดพลาดในการโหลดโพสต์</div>;
  }

  if (!post) {
    return <div>ไม่พบโพสต์</div>;
  }

  return (
    <div className="relative bg-white pt-24 pb-16">
      <PostContent post={post} />
      <CommentSection postId={postId} />
    </div>
  );
};

export default PostDetailPage;