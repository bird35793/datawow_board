'use client';

import { useState } from 'react';
import { IPostCreate } from '@/types/post';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreatePostForm } from './useCreatePostForm'; // Import the hook

export const PostNewForm = () => {
  const {
    postFormData,
    isLoading,
    formErrors,
    handlePostInputChange,
    handlePostSubmit,
  } = useCreatePostForm();

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">New Post</h1>

      {formErrors && (
        <div className="error-alert error-alert-danger">
          {Object.values(formErrors).map((error) => (
            <p key={error}>- {error}</p>
          ))}
        </div>
      )}

      <form onSubmit={handlePostSubmit} className="space-y-4">
        <Input
          type="text"
          id="title"
          name="title"
          label="หัวข้อ"
          value={postFormData.title}
          onChange={handlePostInputChange}
          className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 ${
            formErrors?.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />

        <Input
          type="textarea" // Use textarea for content
          id="content"
          name="content"
          label="เนื้อหา"
          value={postFormData.content}
          onChange={handlePostInputChange}
          className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 h-24 ${ // Adjust height as needed
            formErrors?.content ? 'border-red-500' : 'border-gray-300'
          }`}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'กำลังดำเนินการ...' : 'สร้างกระทู้'}
        </Button>
      </form>
    </div>
  );
};
