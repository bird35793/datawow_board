import { IComment } from '@/types/comment';
import dayjs from 'dayjs'; // ใช้ dayjs สำหรับจัดการวันที่

interface CommentItemProps {
  comment: IComment;
  index: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, index }) => {
  return (
    <div className="border rounded p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">ความคิดเห็นที่ {index + 1}</h3>
        <p className="text-gray-500">{dayjs(comment.createdAt).format('DD MMM YYYY HH:mm')}</p>
      </div>
      <p className="mt-2">{comment.content}</p>
      <p className="mt-2 text-gray-600">โดย {comment.user.displayName}</p>
    </div>
  );
};

export default CommentItem;