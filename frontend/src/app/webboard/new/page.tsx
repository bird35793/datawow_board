'use client'; // Make sure this is a client component

import { PostNewForm } from '@/components/webboard/create-post-form/CreatePostForm'; // Adjust path as needed

export default function NewPostPage() {
  return (
    <div className="mx-auto bg-white pt-24 pb-16"> {/* Optional container for centering/padding */}
      <PostNewForm />
    </div>
  );
}