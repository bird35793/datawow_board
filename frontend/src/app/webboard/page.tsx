'use client';

import Link from 'next/link';
import PostList from '@/components/webboard/Postlist';
import { Button } from '@/components/ui/button';
import { IPost } from '@/types/post';
import { useQuery } from '@tanstack/react-query';

const fetchPosts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
};

const WebboardPage = () => {
    const { isPending, error, data: posts } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        staleTime: 1000 * 60 * 10,
    });

    return (
        <main>
            <div className="relative bg-white pt-24 pb-16">
                <div className="container max-w-7xl mx-auto px-4"> {/* ปรับ padding ด้านข้าง */}
                    <div className="flex items-center justify-between mb-4"> {/* จัด Webboard และ New Post ให้อยู่คนละฝั่ง */}
                        <h1 className="text-3xl text-gray-900 font-bold">Webboard</h1> {/* ข้อความ Webboard */}
                        <div className="flex justify-end mb-4">
                            <div className="w-auto"> {/* กำหนดความกว้างของปุ่ม */}
                                
                                <Link href="/webboard/new"> {/* ลิงค์ไปหน้า New Post */}
                                    <Button className="font-bold py-2 px-4">
                                        New Post
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {isPending && <div className="mb-8">Loading...</div>}

                    {error && <div className="mb-8 text-red-500">Error: {error.message}</div>}

                    {!posts || posts.length === 0 ? (
                        <div className="mb-8">No posts yet.</div>
                    ) : (
                        <PostList posts={posts} />
                    )}
                </div>
            </div>
        </main>
    );
};

export default WebboardPage;