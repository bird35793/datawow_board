import { useState } from 'react';
import { ICommentCreate } from '@/types/comment'; // สร้าง interface สำหรับ comment data
import { createComment } from '@/services/commentServices';

export const useCommentForm = (postId: number) => {
  const [commentFormData, setCommentFormData] = useState<ICommentCreate>({
    content: '',
    postId, // Include postId in the form data
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string } | null>(null);

  const handleCommentInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCommentFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setFormErrors(null);

    try {
      const response = await createComment(commentFormData);

      // Clear form data and redirect or show success message
      setCommentFormData({ content: '', postId }); // Reset content, keep postId
      alert('Comment created successfully!'); // Or redirect
      window.location.reload(); // refresh comment section
    } catch (error) {
      setFormErrors({ general: (error as Error).message }); // Set a general error
    } finally {
      setIsLoading(false);
    }
  };

  return {
    commentFormData,
    isLoading,
    formErrors,
    handleCommentInputChange,
    handleCommentSubmit,
  };
};
