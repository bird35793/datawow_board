import { IComment, ICommentCreate } from '@/types/comment'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const createComment = async (commentFormData: ICommentCreate) => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw new Error('No access token found')
  }

  const response = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(commentFormData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to create comment')
  }

  return response.json()
}


export const fetchCommentsByPostId = async (postId: number): Promise<IComment[]> => {
  const res = await fetch(`${API_URL}/comments/post/${postId}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch comments');
  }
  return res.json();
};
