// src/app/post/[id]/AddComment.tsx
'use client'
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { API_BASE_URL } from '@/config';

export default function AddComment({postId}:{postId:string}){
    const { user } = useAuth();
    const router = useRouter();
    const [content, setContent] = useState('');

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if(!user){
            router.push('/login')
        }else{
            try {
                const res = await fetch(`${API_BASE_URL}/comments`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.access_token}`
                    },
                    body: JSON.stringify({
                        content: content,
                        postId: parseInt(postId),
                        userId: user.userId
                    })
                });
                if(res.ok){
                    setContent('');
                    router.refresh();
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return(
        <form onSubmit={handleSubmit} className='mt-4'>
            <textarea value={content} onChange={(e)=>setContent(e.target.value)} className="w-full h-24 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Add a comment..."></textarea>
            <button type="submit" className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Submit</button>
        </form>
    )
}
