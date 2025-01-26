'use client'
import { API_BASE_URL } from '@/config';
import { ResponseSelectPostDto, ResponseSelectCommentDto } from '@/types';
import { notFound } from 'next/navigation';
import Comment from '@/components/Comment';
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

async function getPost(id: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/posts/${id}`);
        if (!res.ok) {
            return notFound();
        }
        const post: ResponseSelectPostDto = await res.json();
        return post;
    } catch (error) {
        return notFound();
    }
}

async function getComments(postId:string) {
    try {
        const res = await fetch(`${API_BASE_URL}/comments?postId=${postId}`);
        if (!res.ok) {
            return [];
        }
        const comments: ResponseSelectCommentDto[] = await res.json();
        return comments;
    } catch (error) {
        return [];
    }
}

export default async function PostPage({ params }: { params: { id: string } }) {
    const post = await getPost(params.id);
    const comments = await getComments(params.id)

    if (!post) {
        return notFound();
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 dark:text-white">{post.title}</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{post.content}</p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>By : {post.authorDisplayName}</p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>{post.createdAt.toString()}</p>

            <h2 className="text-2xl font-bold mb-4 mt-8 dark:text-white">Comments</h2>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))
            ) : (
                <p className="text-gray-600 dark:text-gray-400">No comments yet.</p>
            )}
            <AddComment postId={post.id.toString()}/>
        </div>
    );
}