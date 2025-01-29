'use client';

import CommentForm from './comment-form/CommentForm';
import { authService } from '@/services/authService';
import CommentItem from './CommentItem';
import { IComment } from '@/types/comment';
import { Button } from '@/components/ui/button';
import { fetchCommentsByPostId } from '@/services/commentServices';
import { useEffect, useState } from 'react';
import { UserDisplayName } from '@/types/auth';
import { useQuery } from '@tanstack/react-query'; // Import useQuery

// Custom Hook สำหรับตรวจสอบ Login

interface CommentSectionProps {
    postId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<UserDisplayName | null>(null)
    const [showCommentForm, setShowCommentForm] = useState(isLoggedIn); // เริ่มต้นให้แสดงฟอร์ม ถ้า Login แล้ว


    const { isLoading: isCommentsLoading, error: commentsError, data: comments } = useQuery({
        queryKey: ['comments', postId], // Unique query key for each post
        queryFn: () => fetchCommentsByPostId(postId),
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        const userData = authService.getUser()
        setIsLoggedIn(!!token)
        setUser(userData)
    }, [])

    const handleLoginClick = () => {
        // Redirect ไปหน้า Login หรือเปิด Modal Login
        window.location.href = '/login'; // หรือใช้ Router ของ Next.js
    };

    return (
        <div className="max-w-3xl mx-auto p-4 mt-8">
            <h2 className="text-2xl font-bold mb-4">ความคิดเห็น</h2>
            {isLoggedIn ? (
                <CommentForm postId={postId} />
            ) : (
                <div>
                    <p>คุณต้องเข้าสู่ระบบเพื่อแสดงความคิดเห็น</p>
                    <Button
                        className="font-bold py-2 px-4 rounded"
                        onClick={handleLoginClick}
                    >
                        เข้าสู่ระบบ
                    </Button>
                </div>
            )}

            <h3 className="text-xl font-semibold mt-8">ความคิดเห็นทั้งหมด</h3>

            {isCommentsLoading ? (
                <div>กำลังโหลดความคิดเห็น...</div>
            ) : commentsError ? (
                <div>เกิดข้อผิดพลาดในการโหลดความคิดเห็น: {commentsError.message}</div>
            ) : comments && comments.length > 0 ? (
                <div>
                    {comments.map((comment: IComment, index: number) => (
                        <CommentItem key={comment.id} comment={comment} index={index} />
                    ))}
                </div>
            ) : (
                <div>ยังไม่มีความคิดเห็น</div>
            )}
        </div>
    );
};

export default CommentSection;