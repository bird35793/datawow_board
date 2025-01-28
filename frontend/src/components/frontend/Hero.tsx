'use client'

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image'
// Mock data สำหรับกระทู้ (post) - ชั่วคราว
const mockPosts = [
  { title: 'กระทู้ 1: หาที่ฝึกงานโปรแกรมเมอร์', author: 'สมชาย', id: 1 },
  { title: 'กระทู้ 2: แชร์ประสบการณ์ฝึกงานที่บริษัท XYZ', author: 'สมหญิง', id: 2 },
  { title: 'กระทู้ 3: ถามเรื่องการเตรียมตัวสัมภาษณ์งาน', author: 'น้องใหม่', id: 3 },
  { title: 'กระทู้ 4: แนะนำหนังสืออ่านสำหรับนักพัฒนา', author: 'พี่ใหญ่', id: 4 },
  { title: 'กระทู้ 5: หาเพื่อนร่วมงานตำแหน่ง Front-end', author: 'คนเก่ง', id: 5 },
];

const Hero = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [posts, setPosts] = useState(mockPosts); // ใช้ state สำหรับข้อมูลกระทู้ (เผื่ออนาคตดึงจาก API)

  // ในอนาคต เราจะใช้ useEffect ดึงข้อมูลจาก API
  // useEffect(() => {
  //   // fetch('/api/posts') // หรือใช้ react-query, axios, ...
  //   //   .then(res => res.json())
  //   //   .then(data => setPosts(data));
  // }, []);

  return (
    <div className="relative bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Side - Images */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-[400px] lg:max-w-[600px] mx-auto">
              {/* Background Shapes */}
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#E6FAF5] rounded-[32px] -z-10" />
              <div className="absolute -top-8 right-24 w-16 h-16 bg-[#E6FAF5] rounded-full -z-10" />
              <div className="absolute -bottom-4 right-16 w-24 h-24 bg-[#FFF9E6] rounded-[32px] -z-10" />
              <div className="absolute bottom-24 -left-8 w-16 h-16 bg-[#FFE6F1] rounded-full -z-10" />

              {/* Hero Images - Mobile */}
              <div className="lg:hidden">
                <div className="absolute top-8 left-0 w-[180px] h-[180px] animate-float-1">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/hero-1.png"
                      alt="Student with megaphone"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <div className="absolute top-8 right-0 w-[180px] h-[180px] animate-float-2">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/hero-2.png"
                      alt="Professional in white shirt"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <div className="absolute top-[220px] left-1/2 -translate-x-1/2 w-[180px] h-[180px] animate-float-3">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/hero-3.png"
                      alt="Student with phone"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Hero Images - Desktop */}
              <div className="hidden lg:block">
                <div className="absolute top-0 left-0 w-[320px] h-[320px] animate-float-1">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/hero-1.png"
                      alt="Student with megaphone"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <div className="absolute top-12 right-0 w-[280px] h-[280px] animate-float-2">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/hero-2.png"
                      alt="Professional in white shirt"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 right-24 w-[280px] h-[280px] animate-float-3">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/hero-3.png"
                      alt="Student with phone"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Webboard
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              พูดคุย แลกเปลี่ยนประสบการณ์ และหาข้อมูลที่เป็นประโยชน์
            </p>

            {/* แสดงกระทู้ */}
            <ul className="mb-8">
              {posts.map((post) => (
                <li key={post.id} className="mb-4 border-b border-gray-200 pb-2">
                  <Link href={`/webboard/${post.id}`} className="text-lg font-medium text-gray-900 hover:text-blue-500"> {/* ลิงก์ไปหน้ากระทู้ */}
                    {post.title}
                  </Link>
                  <p className="text-sm text-gray-500">โดย {post.author}</p>
                </li>
              ))}
            </ul>

            {/* ปุ่ม Read More */}
            <Link href="/webboard">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero