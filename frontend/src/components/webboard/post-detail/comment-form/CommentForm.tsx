'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCommentForm } from './useCreateCommentForm'; // Import the hook

interface CommentFormProps {
  postId: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const {
    commentFormData,
    isLoading,
    formErrors,
    handleCommentInputChange,
    handleCommentSubmit,
  } = useCommentForm(postId); // Pass postId to the hook

  return (
    <div className="w-full"> {/* Adjust width as needed */}
      {formErrors && (
        <div className="error-alert error-alert-danger">
          {Object.values(formErrors).map((error) => (
            <p key={error}>- {error}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleCommentSubmit} className="space-y-4">
        <Input
          type="textarea"
          id="content"
          name="content"
          label="เขียนความคิดเห็นของคุณ..."
          value={commentFormData.content}
          onChange={(event) => handleCommentInputChange(event as unknown as React.ChangeEvent<HTMLTextAreaElement>)}
          className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 h-24 ${
            formErrors?.content ? 'border-red-500' : 'border-gray-300'
          }`}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'กำลังส่ง...' : 'ส่ง'}
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
